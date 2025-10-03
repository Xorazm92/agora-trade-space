"use client";

const useFormatPrice = () => {
  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("uz-UZ", {
      style: "currency",
      currency: "UZS",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return formatPrice;
};

export default useFormatPrice;
