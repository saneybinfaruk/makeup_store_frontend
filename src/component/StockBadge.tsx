import { Badge } from "@chakra-ui/react";

const StockBadge = ({ amount }: { amount: number }) => {
  const badgeColorSet = (): { color: string; statusText: string } => {
    // Ensure valid input (optional)
    const stockAmount = amount;
    if (stockAmount < 0) {
      throw new Error("Stock amount cannot be negative");
    }

    // Define thresholds and color assignments
    const lowStockThreshold = 20; // Adjust based on your needs (e.g., 5)
    const outOfStockColor = { color: "red", statusText: "Out Of Stock" };
    const lowStockColor = { color: "yellow", statusText: "Low Stock" };
    const inStockColor = { color: "green", statusText: "In Stock" };

    // Determine color based on stock level
    if (stockAmount === 0) {
      return outOfStockColor; // Explicitly handle zero stock
    } else if (stockAmount <= lowStockThreshold) {
      return lowStockColor;
    } else {
      return inStockColor;
    }
  };

  return (
    <Badge colorScheme={badgeColorSet().color}>
      {badgeColorSet().statusText}
    </Badge>
  );
};

export default StockBadge;
