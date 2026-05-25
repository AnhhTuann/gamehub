using System;
using System.Collections.Generic;

namespace OmniWear.Warehouse
{
    public class Product
    {
        public string Id { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public decimal Price { get; set; }
        public string Category { get; set; } = string.Empty;
        public string Image { get; set; } = string.Empty;
        public int Inventory { get; set; }
    }

    public class ProductsResponse
    {
        public List<Product> Products { get; set; } = new();
    }

    public class UpdateInventoryResponse
    {
        public Product UpdateInventory { get; set; } = new();
    }
}
