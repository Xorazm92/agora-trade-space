"use client";
import Table from "@/app/components/layout/Table";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetAllProductsQuery,
  useUpdateProductMutation,
} from "@/app/store/apis/ProductApi";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { Trash2, Edit, Upload, X } from "lucide-react";
import ConfirmModal from "@/app/components/organisms/ConfirmModal";
import useToast from "@/app/hooks/ui/useToast";
import ProductFileUpload from "./ProductFileUpload";
import { usePathname } from "next/navigation";
import { ProductFormData } from "./product.types";
import { withAuth } from "@/app/components/HOC/WithAuth";
import { useTranslations } from "next-intl";

const ProductsDashboard = () => {
  const { showToast } = useToast();
  const t = useTranslations("products");
  const [createProduct, { isLoading: isCreating, error: createError }] =
    useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating, error: updateError }] =
    useUpdateProductMutation();
  const [deleteProduct, { isLoading: isDeleting }] = useDeleteProductMutation();

  const pathname = usePathname();
  const shouldFetchProducts = pathname === "/dashboard/products";

  const { data, isLoading, refetch } = useGetAllProductsQuery(
    { select: { variants: true } }, // Ensure variants are included
    { skip: !shouldFetchProducts }
  );
  const products = data?.products || [];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductFormData | null>(
    null
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isFileUploadOpen, setIsFileUploadOpen] = useState(false);

  const handleCreateProduct = async (data: ProductFormData) => {
    try {
      // Convert FormData to JSON payload for RTK Query compatibility
      const payload = {
        name: data.name || "",
        description: data.description || "",
        isNew: data.isNew,
        isTrending: data.isTrending,
        isBestSeller: data.isBestSeller,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId || "",
        variants: data.variants.map((variant) => ({
          sku: variant.sku || "",
          price: Number(variant.price) || 0,
          stock: Number(variant.stock) || 0,
          lowStockThreshold: Number(variant.lowStockThreshold) || 10,
          barcode: variant.barcode || "",
          warehouseLocation: variant.warehouseLocation || "",
          attributes: JSON.stringify((variant.attributes || []).filter(attr => attr.valueId && attr.valueId.trim() !== "")),
          imageIndexes: JSON.stringify([]),
          // For now, skip images to avoid serialization issues
          images: []
        }))
      };

      console.log("Creating product with payload:", payload);

      const result = await createProduct(payload).unwrap();
      console.log("Product created successfully:", result);
      
      setIsModalOpen(false);
      showToast(t("product_created_successfully"), "success");
      if (shouldFetchProducts) {
        refetch();
      }
    } catch (err: any) {
      console.error("Failed to create product:", err);
      console.log("Error details:", {
        status: err?.status,
        data: err?.data,
        message: err?.message
      });
      showToast(
        err?.data?.message || t("failed_to_create_product"), 
        "error"
      );
    }
  };

  const handleUpdateProduct = async (data: ProductFormData) => {
    if (!editingProduct) return;

    try {
      const payload = {
        name: data.name || "",
        description: data.description || "",
        isNew: data.isNew,
        isTrending: data.isTrending,
        isBestSeller: data.isBestSeller,
        isFeatured: data.isFeatured,
        categoryId: data.categoryId || "",
        variants: data.variants.map((variant) => ({
          id: variant.id,
          sku: variant.sku || "",
          price: Number(variant.price) || 0,
          stock: Number(variant.stock) || 0,
          lowStockThreshold: Number(variant.lowStockThreshold) || 10,
          barcode: variant.barcode || "",
          warehouseLocation: variant.warehouseLocation || "",
          attributes: JSON.stringify(
            (variant.attributes || []).filter(attr => attr.valueId && attr.valueId.trim() !== "")
          ),
          imageIndexes: JSON.stringify([]),
          images: []
        }))
      };

      await updateProduct({
        id: editingProduct.id!,
        data: payload,
      }).unwrap();
      
      setIsModalOpen(false);
      setEditingProduct(null);
      showToast(t("product_updated_successfully"), "success");
      refetch();
    } catch (err: any) {
      console.error("Failed to update product:", err);
      showToast(
        err?.data?.message || t("failed_to_update_product"), 
        "error"
      );
    }
  };

  const handleDeleteProduct = (id: string) => {
    setProductToDelete(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    try {
      await deleteProduct(productToDelete).unwrap();
      setIsConfirmModalOpen(false);
      setProductToDelete(null);
      showToast(t("product_deleted_successfully"), "success");
    } catch (err) {
      console.error("Failed to delete product:", err);
      showToast(t("failed_to_delete_product"), "error");
    }
  };

  const cancelDelete = () => {
    setIsConfirmModalOpen(false);
    setProductToDelete(null);
  };

  const handleFileUploadSuccess = () => {};

  const columns = [
    {
      key: "name",
      label: t("product_name"),
      sortable: true,
      render: (row: any) => (
        <div className="flex items-center space-x-2">
          <span>{row.name}</span>
        </div>
      ),
    },
    {
      key: "variants",
      label: t("variants"),
      sortable: false,
      render: (row: any) => (
        <div>
          {row.variants?.length > 0 ? (
            row.variants.map((v: any) => (
              <span
                key={v.id}
                className="inline-block mr-2 bg-gray-100 px-2 py-1 rounded"
              >
                {v.sku}
              </span>
            ))
          ) : (
            <span className="text-gray-500">{t("no_variants")}</span>
          )}
        </div>
      ),
    },
    {
      key: "salesCount",
      label: t("sales_count"),
      sortable: true,
      render: (row: any) => row.salesCount,
    },
    {
      key: "actions",
      label: t("actions"),
      render: (row: any) => (
        <div className="flex space-x-2">
          <button
            onClick={() => {
              setEditingProduct({
                id: row.id,
                name: row.name,
                isNew: row.isNew,
                isTrending: row.isTrending,
                isBestSeller: row.isBestSeller,
                isFeatured: row.isFeatured,
                categoryId: row.categoryId,
                description: row.description || "",
                variants: row.variants || [],
              });
              setIsModalOpen(true);
            }}
            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Edit size={16} />
            {t("edit")}
          </button>
          <button
            onClick={() => handleDeleteProduct(row.id)}
            className="text-red-600 hover:text-red-800 flex items-center gap-1"
            disabled={isDeleting}
          >
            <Trash2 size={16} />
            {isDeleting && productToDelete === row.id
              ? t("deleting")
              : t("delete")}
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-xl font-semibold">{t("product_list")}</h1>
          <p className="text-sm text-gray-500">{t("manage_products")}</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setIsFileUploadOpen(!isFileUploadOpen)}
            className="px-4 py-2 bg-[#5d8a02] text-white rounded-md flex items-center"
          >
            <Upload className="mr-2 h-4 w-4" />
            {t("excel_sheet")}
          </button>
          <button
            onClick={() => {
              setEditingProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          >
            {t("create_product")}
          </button>
        </div>
      </div>

      {isFileUploadOpen && (
        <div className="mb-6 bg-white p-5 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-medium">{t("import_products")}</h2>
            <button
              onClick={() => setIsFileUploadOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>
          <ProductFileUpload onUploadSuccess={handleFileUploadSuccess} />
        </div>
      )}

      <Table
        data={products}
        columns={columns}
        isLoading={isLoading}
        emptyMessage={t("no_products_available")}
        onRefresh={() => console.log("refreshed")}
        totalPages={data?.totalPages}
        totalResults={data?.totalResults}
        resultsPerPage={data?.resultsPerPage}
        currentPage={data?.currentPage}
      />

      <ProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct}
        initialData={editingProduct || undefined}
        isLoading={editingProduct ? isUpdating : isCreating}
        error={editingProduct ? updateError : createError}
      />

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        message={t("confirm_delete_product")}
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </div>
  );
};

export default withAuth(ProductsDashboard);
