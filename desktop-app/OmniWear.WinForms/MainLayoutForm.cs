using System;
using System.Drawing;
using System.Windows.Forms;
using OmniWear.WinForms.UserControls;

namespace OmniWear.WinForms
{
    public partial class MainLayoutForm : Form
    {
        private Panel sidebarPanel;
        private Panel mainContentPanel;

        public MainLayoutForm()
        {
            InitializeComponent();
            LoadUserControl(new ProductManagementUC());
        }

        private void InitializeComponent()
        {
            this.Text = "OmniWear Warehouse Management";
            this.Size = new Size(1024, 768);
            this.StartPosition = FormStartPosition.CenterScreen;

            // Sidebar
            sidebarPanel = new Panel
            {
                Dock = DockStyle.Left,
                Width = 200,
                BackColor = Color.FromArgb(45, 45, 48)
            };

            Label lblLogo = new Label
            {
                Text = "OmniWear",
                ForeColor = Color.White,
                Font = new Font("Segoe UI", 16, FontStyle.Bold),
                Location = new Point(20, 20),
                AutoSize = true
            };
            sidebarPanel.Controls.Add(lblLogo);

            Button btnProducts = CreateMenuButton("Products", 80);
            btnProducts.Click += (s, e) => LoadUserControl(new ProductManagementUC());
            
            Button btnEmployees = CreateMenuButton("Employees", 130);
            btnEmployees.Click += (s, e) => LoadUserControl(new EmployeeManagementUC());

            Button btnLogout = CreateMenuButton("Logout", this.Height - 100);
            btnLogout.Anchor = AnchorStyles.Bottom | AnchorStyles.Left;
            btnLogout.Click += (s, e) => 
            {
                this.Hide();
                new LoginForm().Show();
            };

            sidebarPanel.Controls.Add(btnProducts);
            
            if (GlobalState.UserRole == "ADMIN")
            {
                sidebarPanel.Controls.Add(btnEmployees);
            }
            
            sidebarPanel.Controls.Add(btnLogout);

            // Main Content
            mainContentPanel = new Panel
            {
                Dock = DockStyle.Fill,
                BackColor = Color.WhiteSmoke
            };

            this.Controls.Add(mainContentPanel);
            this.Controls.Add(sidebarPanel);
        }

        private Button CreateMenuButton(string text, int y)
        {
            return new Button
            {
                Text = text,
                Location = new Point(0, y),
                Width = 200,
                Height = 45,
                FlatStyle = FlatStyle.Flat,
                ForeColor = Color.White,
                BackColor = Color.Transparent,
                Font = new Font("Segoe UI", 10),
                TextAlign = ContentAlignment.MiddleLeft,
                Padding = new Padding(20, 0, 0, 0)
            };
        }

        private void LoadUserControl(UserControl uc)
        {
            mainContentPanel.Controls.Clear();
            uc.Dock = DockStyle.Fill;
            mainContentPanel.Controls.Add(uc);
        }
    }
}
