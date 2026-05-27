using System;
using System.Drawing;
using System.Windows.Forms;

namespace OmniWear.WinForms
{
    public class GlobalState
    {
        public static string AccessToken { get; set; } = string.Empty;
        public static string UserRole { get; set; } = string.Empty;
    }

    public partial class LoginForm : Form
    {
        private TextBox txtUsername;
        private TextBox txtPassword;
        private Button btnLogin;

        public LoginForm()
        {
            InitializeComponent();
        }

        private void InitializeComponent()
        {
            this.Text = "OmniWear - Login";
            this.Size = new Size(400, 300);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;

            Label lblTitle = new Label { Text = "OMNIWEAR ADMIN", Font = new Font("Segoe UI", 16, FontStyle.Bold), Location = new Point(100, 20), AutoSize = true };
            
            Label lblUser = new Label { Text = "Email:", Location = new Point(50, 80), AutoSize = true };
            txtUsername = new TextBox { Location = new Point(50, 100), Width = 280 };
            
            Label lblPass = new Label { Text = "Password:", Location = new Point(50, 140), AutoSize = true };
            txtPassword = new TextBox { Location = new Point(50, 160), Width = 280, PasswordChar = '*' };
            
            btnLogin = new Button { Text = "Login", Location = new Point(50, 200), Width = 280, Height = 40, BackColor = Color.DodgerBlue, ForeColor = Color.White, FlatStyle = FlatStyle.Flat };
            btnLogin.Click += BtnLogin_Click;

            this.Controls.Add(lblTitle);
            this.Controls.Add(lblUser);
            this.Controls.Add(txtUsername);
            this.Controls.Add(lblPass);
            this.Controls.Add(txtPassword);
            this.Controls.Add(btnLogin);
        }

        private async void BtnLogin_Click(object sender, EventArgs e)
        {
            // Simulate API Call
            string email = txtUsername.Text;
            string password = txtPassword.Text;

            if (string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password))
            {
                MessageBox.Show("Please enter email and password.", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }

            btnLogin.Text = "Logging in...";
            btnLogin.Enabled = false;

            // MOCK API CALL
            await System.Threading.Tasks.Task.Delay(1000);

            if (email == "admin@omniwear.com" && password == "admin123")
            {
                GlobalState.AccessToken = "mock_jwt_token_12345";
                GlobalState.UserRole = "ADMIN";
                
                this.Hide();
                var mainForm = new MainLayoutForm();
                mainForm.Closed += (s, args) => this.Close();
                mainForm.Show();
            }
            else
            {
                MessageBox.Show("Invalid credentials. Try admin@omniwear.com / admin123", "Login Failed", MessageBoxButtons.OK, MessageBoxIcon.Warning);
                btnLogin.Text = "Login";
                btnLogin.Enabled = true;
            }
        }
    }
}
