using System;
using System.Drawing;
using System.Windows.Forms;
using System.Collections.Generic;

namespace OmniWear.WinForms.UserControls
{
    public class Product
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public int Inventory { get; set; }
    }

    public partial class ProductManagementUC : UserControl
    {
        private DataGridView dgvProducts;
        private TextBox txtSearch;
        private ComboBox cbCategory;

        public ProductManagementUC()
        {
            InitializeComponent();
            LoadData();
        }

        private void InitializeComponent()
        {
            this.BackColor = Color.White;

            Label lblTitle = new Label { Text = "Product Management", Font = new Font("Segoe UI", 16, FontStyle.Bold), Location = new Point(20, 20), AutoSize = true };
            
            txtSearch = new TextBox { Location = new Point(20, 70), Width = 200, PlaceholderText = "Search products..." };
            
            cbCategory = new ComboBox { Location = new Point(230, 70), Width = 150 };
            cbCategory.Items.AddRange(new string[] { "All Categories", "Men", "Women", "Accessories", "Shoes" });
            cbCategory.SelectedIndex = 0;

            Button btnSearch = new Button { Text = "Search", Location = new Point(390, 68), Width = 80, BackColor = Color.LightGray };
            
            Button btnAdd = new Button { Text = "+ Add Product", Location = new Point(500, 68), Width = 100, BackColor = Color.DodgerBlue, ForeColor = Color.White };
            btnAdd.Click += BtnAdd_Click;

            Button btnEdit = new Button { Text = "Edit", Location = new Point(610, 68), Width = 80, BackColor = Color.Orange, ForeColor = Color.White };
            btnEdit.Click += BtnEdit_Click;

            Button btnDelete = new Button { Text = "Delete", Location = new Point(700, 68), Width = 80, BackColor = Color.Tomato, ForeColor = Color.White };

            dgvProducts = new DataGridView
            {
                Location = new Point(20, 110),
                Width = 760,
                Height = 500
            };
            OmniWear.WinForms.Helpers.UIHelper.ConfigureDataGridView(dgvProducts);

            this.Controls.Add(lblTitle);
            this.Controls.Add(txtSearch);
            this.Controls.Add(cbCategory);
            this.Controls.Add(btnSearch);
            this.Controls.Add(btnAdd);
            this.Controls.Add(btnEdit);
            this.Controls.Add(btnDelete);
            this.Controls.Add(dgvProducts);
        }

        private void LoadData()
        {
            // Mock Data
            var list = new List<Product>
            {
                new Product { Id = "P001", Title = "Cotton T-Shirt", Category = "Men", Price = 29.99m, Inventory = 150 },
                new Product { Id = "P002", Title = "Denim Jacket", Category = "Women", Price = 89.99m, Inventory = 30 },
                new Product { Id = "P003", Title = "Sneakers", Category = "Shoes", Price = 119.99m, Inventory = 0 }
            };
            dgvProducts.DataSource = list;
        }

        private void BtnAdd_Click(object sender, EventArgs e)
        {
            var dialog = new ProductEditDialog();
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                LoadData();
            }
        }

        private void BtnEdit_Click(object sender, EventArgs e)
        {
            if (dgvProducts.SelectedRows.Count > 0)
            {
                var dialog = new ProductEditDialog();
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    LoadData();
                }
            }
        }
    }

    public class ProductEditDialog : Form
    {
        public ProductEditDialog()
        {
            this.Text = "Add / Edit Product";
            this.Size = new Size(400, 450);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;

            Label lblTitle = new Label { Text = "Title:", Location = new Point(20, 20) };
            TextBox txtTitle = new TextBox { Location = new Point(120, 20), Width = 200 };

            Label lblPrice = new Label { Text = "Price:", Location = new Point(20, 60) };
            NumericUpDown numPrice = new NumericUpDown { Location = new Point(120, 60), Width = 100, DecimalPlaces = 2 };

            Label lblStock = new Label { Text = "Inventory:", Location = new Point(20, 100) };
            NumericUpDown numStock = new NumericUpDown { Location = new Point(120, 100), Width = 100 };

            Label lblCategory = new Label { Text = "Category:", Location = new Point(20, 140) };
            ComboBox cbCategory = new ComboBox { Location = new Point(120, 140), Width = 200 };
            cbCategory.Items.AddRange(new string[] { "Men", "Women", "Shoes", "Accessories" });

            Button btnSelectImage = new Button { Text = "Select Image...", Location = new Point(120, 180), Width = 100 };
            PictureBox picImage = new PictureBox { Location = new Point(120, 220), Width = 100, Height = 100, BorderStyle = BorderStyle.FixedSingle, SizeMode = PictureBoxSizeMode.Zoom };

            btnSelectImage.Click += (s, e) =>
            {
                using (OpenFileDialog ofd = new OpenFileDialog { Filter = "Image Files|*.jpg;*.png" })
                {
                    if (ofd.ShowDialog() == DialogResult.OK)
                    {
                        picImage.Image = Image.FromFile(ofd.FileName);
                    }
                }
            };

            Button btnSave = new Button { Text = "Save", Location = new Point(120, 350), Width = 80, DialogResult = DialogResult.OK };
            Button btnCancel = new Button { Text = "Cancel", Location = new Point(210, 350), Width = 80, DialogResult = DialogResult.Cancel };

            this.Controls.Add(lblTitle); this.Controls.Add(txtTitle);
            this.Controls.Add(lblPrice); this.Controls.Add(numPrice);
            this.Controls.Add(lblStock); this.Controls.Add(numStock);
            this.Controls.Add(lblCategory); this.Controls.Add(cbCategory);
            this.Controls.Add(btnSelectImage); this.Controls.Add(picImage);
            this.Controls.Add(btnSave); this.Controls.Add(btnCancel);
        }
    }
}
