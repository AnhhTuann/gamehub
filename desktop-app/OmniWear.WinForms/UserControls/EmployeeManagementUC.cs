using System;
using System.Drawing;
using System.Windows.Forms;
using System.Collections.Generic;

namespace OmniWear.WinForms.UserControls
{
    public class Employee
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public string Status { get; set; }
    }

    public partial class EmployeeManagementUC : UserControl
    {
        private DataGridView dgvEmployees;

        public EmployeeManagementUC()
        {
            InitializeComponent();
            LoadData();
        }

        private void InitializeComponent()
        {
            this.BackColor = Color.White;

            Label lblTitle = new Label { Text = "Employee Management", Font = new Font("Segoe UI", 16, FontStyle.Bold), Location = new Point(20, 20), AutoSize = true };
            
            Button btnAdd = new Button { Text = "+ Add Employee", Location = new Point(20, 70), Width = 120, BackColor = Color.DodgerBlue, ForeColor = Color.White };
            btnAdd.Click += BtnAdd_Click;

            Button btnEdit = new Button { Text = "Edit/Assign Role", Location = new Point(150, 70), Width = 120, BackColor = Color.Orange, ForeColor = Color.White };
            btnEdit.Click += BtnEdit_Click;

            dgvEmployees = new DataGridView
            {
                Location = new Point(20, 110),
                Width = 760,
                Height = 500,
                AutoSizeColumnsMode = DataGridViewAutoSizeColumnsMode.Fill,
                AllowUserToAddRows = false,
                ReadOnly = true,
                SelectionMode = DataGridViewSelectionMode.FullRowSelect
            };

            this.Controls.Add(lblTitle);
            this.Controls.Add(btnAdd);
            this.Controls.Add(btnEdit);
            this.Controls.Add(dgvEmployees);
        }

        private void LoadData()
        {
            var list = new List<Employee>
            {
                new Employee { Id = "E001", Name = "Admin User", Email = "admin@omniwear.com", Phone = "1234567890", Role = "ADMIN", Status = "Active" },
                new Employee { Id = "E002", Name = "John Staff", Email = "john@omniwear.com", Phone = "0987654321", Role = "STAFF", Status = "Active" },
                new Employee { Id = "E003", Name = "Warehouse Worker", Email = "worker@omniwear.com", Phone = "111222333", Role = "WAREHOUSE", Status = "Inactive" }
            };
            dgvEmployees.DataSource = list;
        }

        private void BtnAdd_Click(object sender, EventArgs e)
        {
            var dialog = new EmployeeEditDialog();
            if (dialog.ShowDialog() == DialogResult.OK)
            {
                LoadData();
            }
        }

        private void BtnEdit_Click(object sender, EventArgs e)
        {
            if (dgvEmployees.SelectedRows.Count > 0)
            {
                var dialog = new EmployeeEditDialog();
                if (dialog.ShowDialog() == DialogResult.OK)
                {
                    LoadData();
                }
            }
        }
    }

    public class EmployeeEditDialog : Form
    {
        public EmployeeEditDialog()
        {
            this.Text = "Add / Edit Employee";
            this.Size = new Size(350, 350);
            this.StartPosition = FormStartPosition.CenterParent;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;

            Label lblName = new Label { Text = "Name:", Location = new Point(20, 20) };
            TextBox txtName = new TextBox { Location = new Point(120, 20), Width = 180 };

            Label lblEmail = new Label { Text = "Email:", Location = new Point(20, 60) };
            TextBox txtEmail = new TextBox { Location = new Point(120, 60), Width = 180 };

            Label lblPhone = new Label { Text = "Phone:", Location = new Point(20, 100) };
            TextBox txtPhone = new TextBox { Location = new Point(120, 100), Width = 180 };

            Label lblRole = new Label { Text = "Role:", Location = new Point(20, 140) };
            ComboBox cbRole = new ComboBox { Location = new Point(120, 140), Width = 180 };
            cbRole.Items.AddRange(new string[] { "ADMIN", "STAFF", "WAREHOUSE" });

            CheckBox chkActive = new CheckBox { Text = "Is Active (Working)", Location = new Point(120, 180), Width = 150, Checked = true };

            Button btnSave = new Button { Text = "Save", Location = new Point(120, 240), Width = 80, DialogResult = DialogResult.OK };
            Button btnCancel = new Button { Text = "Cancel", Location = new Point(210, 240), Width = 80, DialogResult = DialogResult.Cancel };

            this.Controls.Add(lblName); this.Controls.Add(txtName);
            this.Controls.Add(lblEmail); this.Controls.Add(txtEmail);
            this.Controls.Add(lblPhone); this.Controls.Add(txtPhone);
            this.Controls.Add(lblRole); this.Controls.Add(cbRole);
            this.Controls.Add(chkActive);
            this.Controls.Add(btnSave); this.Controls.Add(btnCancel);
        }
    }
}
