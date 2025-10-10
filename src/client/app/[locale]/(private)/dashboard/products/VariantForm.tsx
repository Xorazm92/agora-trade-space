"use client";
import { Controller, useFieldArray, UseFormReturn } from "react-hook-form";
import { Trash2, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import Dropdown from "@/app/components/ui/Dropdown";
import MultiSelectDropdown from "@/app/components/ui/MultiSelectDropdown";
import ImageUploader from "@/app/components/molecules/ImageUploader";
import { ProductFormData } from "./product.types";

interface VariantFormProps {
  form: UseFormReturn<ProductFormData>;
  categoryAttributes: {
    id: string;
    name: string;
    isRequired: boolean;
    values: { id: string; value: string; slug: string }[];
  }[];
}

const VariantForm: React.FC<VariantFormProps> = ({
  form,
  categoryAttributes,
}) => {
  const t = useTranslations("products");
  const {
    control,
    formState: { errors },
    setValue,
  } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  const inputStyles =
    "w-full p-2 border border-gray-300 rounded-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition-colors";

  return (
    <div className="space-y-6 p-6 bg-white rounded-xl shadow-sm">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900">
          {t("variants")}
        </h2>
        <button
          type="button"
          onClick={() =>
            append({
              id: `temp-${Date.now()}`,
              sku: "",
              price: 0,
              stock: 0,
              lowStockThreshold: 10,
              barcode: "",
              warehouseLocation: "",
              images: [],
              attributes: categoryAttributes
                .filter((attr) => attr.isRequired)
                .map((attr) => ({ attributeId: attr.id, valueId: "" })),
              sizes: [],
              colors: [],
              materials: [],
              customAttributes: {},
            })
          }
          className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
        >
          <Plus size={20} /> {t("add_variant")}
        </button>
      </div>

      {fields.map((field, index) => (
        <div
          key={field.id}
          className="border border-gray-200 rounded-lg p-4 space-y-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-base font-medium text-gray-800">
              {t("variant")} {index + 1}
            </h3>
            <button
              type="button"
              onClick={() => remove(index)}
              className="text-red-500 hover:text-red-600"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("variant_sku")}
              </label>
              <Controller
                name={`variants.${index}.sku`}
                control={control}
                rules={{
                  required: t("sku_required"),
                  pattern: {
                    value: /^[a-zA-Z0-9-]+$/,
                    message: t("sku_format_error"),
                  },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={inputStyles}
                    placeholder={t("sku_placeholder")}
                  />
                )}
              />
              {errors.variants?.[index]?.sku && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.variants[index].sku?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("variant_price")} (so'm)
              </label>
              <Controller
                name={`variants.${index}.price`}
                control={control}
                rules={{
                  required: t("price_required"),
                  min: { value: 0.01, message: t("price_positive_error") },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    step="0.01"
                    className={inputStyles}
                    placeholder={t("price_placeholder")}
                  />
                )}
              />
              {errors.variants?.[index]?.price && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.variants[index].price?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("variant_stock")}
              </label>
              <Controller
                name={`variants.${index}.stock`}
                control={control}
                rules={{
                  required: t("stock_required"),
                  min: { value: 0, message: t("stock_negative_error") },
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={inputStyles}
                    placeholder={t("stock_placeholder")}
                  />
                )}
              />
              {errors.variants?.[index]?.stock && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.variants[index].stock?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("low_stock_threshold")}
              </label>
              <Controller
                name={`variants.${index}.lowStockThreshold`}
                control={control}
                rules={{ min: { value: 0, message: t("threshold_negative_error") } }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="number"
                    className={inputStyles}
                    placeholder={t("threshold_placeholder")}
                  />
                )}
              />
              {errors.variants?.[index]?.lowStockThreshold && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.variants[index].lowStockThreshold?.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("variant_barcode")}
              </label>
              <Controller
                name={`variants.${index}.barcode`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={inputStyles}
                    placeholder={t("barcode_placeholder")}
                  />
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t("warehouse_location")}
              </label>
              <Controller
                name={`variants.${index}.warehouseLocation`}
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className={inputStyles}
                    placeholder={t("warehouse_placeholder")}
                  />
                )}
              />
            </div>

            <div className="md:col-span-2">
              <ImageUploader
                control={control}
                errors={errors}
                setValue={setValue}
                label={t("variant_images")}
                name={`variants.${index}.images`}
                maxFiles={5}
              />
              {errors.variants?.[index]?.images && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.variants[index].images?.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-700">{t("attributes")}</h4>
            
            {/* Attributes faqat mavjud bo'lganda ko'rsatish */}
            {categoryAttributes && categoryAttributes.length > 0 && (
              <div className="space-y-4">
                {/* Size Attribute - Special handling with multi-select */}
                {categoryAttributes.find(attr => attr.name?.toLowerCase().includes('o\'lcham') || attr.name?.toLowerCase().includes('size')) && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t("size")} <span className="text-red-500">*</span>
                </label>
                <Controller
                  name={`variants.${index}.attributes`}
                  control={control}
                  render={({ field }) => {
                    const sizeAttribute = categoryAttributes.find(attr => 
                      attr.name?.toLowerCase().includes('o\'lcham') || 
                      attr.name?.toLowerCase().includes('size')
                    );
                    const currentAttributes = field.value || [];
                    const sizeValues = currentAttributes
                      .filter((attr: any) => attr.attributeId === sizeAttribute?.id)
                      .map((attr: any) => attr.valueId);
                    
                    return (
                      <MultiSelectDropdown
                        options={sizeAttribute?.values.map((value) => ({
                          label: value.value,
                          value: value.id,
                        })) || []}
                        selectedValues={sizeValues || []}
                        onChange={(selected) => {
                          // Remove all size attributes first
                          const newAttributes = currentAttributes.filter(
                            (attr: any) => attr.attributeId !== sizeAttribute?.id
                          );
                          
                          // Add selected sizes
                          if (sizeAttribute) {
                            selected.forEach(valueId => {
                              newAttributes.push({
                                attributeId: sizeAttribute.id,
                                valueId: valueId,
                              });
                            });
                          }
                          
                          field.onChange(newAttributes);
                        }}
                        placeholder="O'lchamlarni tanlang"
                      />
                    );
                  }}
                />
              </div>
            )}

                {/* Color Attribute - Special handling with multi-select */}
                {categoryAttributes.find(attr => attr.name?.toLowerCase().includes('rang') || attr.name?.toLowerCase().includes('color')) && (
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  {t("color")} <span className="text-red-500">*</span>
                </label>
                <Controller
                  name={`variants.${index}.attributes`}
                  control={control}
                  render={({ field }) => {
                    const colorAttribute = categoryAttributes.find(attr => 
                      attr.name?.toLowerCase().includes('rang') || 
                      attr.name?.toLowerCase().includes('color')
                    );
                    const currentAttributes = field.value || [];
                    const colorValues = currentAttributes
                      .filter((attr: any) => attr.attributeId === colorAttribute?.id)
                      .map((attr: any) => attr.valueId);
                    
                    return (
                      <MultiSelectDropdown
                        options={colorAttribute?.values.map((value) => ({
                          label: value.value,
                          value: value.id,
                        })) || []}
                        selectedValues={colorValues || []}
                        onChange={(selected) => {
                          // Remove all color attributes first
                          const newAttributes = currentAttributes.filter(
                            (attr: any) => attr.attributeId !== colorAttribute?.id
                          );
                          
                          // Add selected colors
                          if (colorAttribute) {
                            selected.forEach(valueId => {
                              newAttributes.push({
                                attributeId: colorAttribute.id,
                                valueId: valueId,
                              });
                            });
                          }
                          
                          field.onChange(newAttributes);
                        }}
                        placeholder="Ranglarni tanlang"
                      />
                    );
                  }}
                />
              </div>
            )}

                {/* Other Dynamic Attributes with multi-select */}
                {categoryAttributes
                  .filter(attr => !attr.name?.toLowerCase().includes('o\'lcham') && 
                                 !attr.name?.toLowerCase().includes('rang') &&
                                 !attr.name?.toLowerCase().includes('size') &&
                                 !attr.name?.toLowerCase().includes('color'))
                  .map((attribute) => (
                <div key={attribute.id}>
                  <label className="block text-sm font-medium text-gray-600 mb-1">
                    {attribute.name} {attribute.isRequired && <span className="text-red-500">*</span>}
                  </label>
                  <Controller
                    name={`variants.${index}.attributes`}
                    control={control}
                    render={({ field }) => {
                      const currentAttributes = field.value || [];
                      const attributeValues = currentAttributes
                        .filter((attr: any) => attr.attributeId === attribute.id)
                        .map((attr: any) => attr.valueId);
                      
                      return (
                        <MultiSelectDropdown
                          options={attribute.values.map((value) => ({
                            label: value.value,
                            value: value.id,
                          }))}
                          selectedValues={attributeValues || []}
                          onChange={(selected) => {
                            // Remove all attributes of this type first
                            const newAttributes = currentAttributes.filter(
                              (attr: any) => attr.attributeId !== attribute.id
                            );
                            
                            // Add selected values
                            selected.forEach(valueId => {
                              newAttributes.push({
                                attributeId: attribute.id,
                                valueId: valueId,
                              });
                            });
                            
                            field.onChange(newAttributes);
                          }}
                          placeholder={`${attribute.name}ni tanlang`}
                        />
                      );
                    }}
                  />
                </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {errors.variants && !Array.isArray(errors.variants) && (
        <p className="text-red-500 text-xs mt-2">
          {t("variant_required")}
        </p>
      )}
    </div>
  );
};

export default VariantForm;
