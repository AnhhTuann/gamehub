using System;
using System.Drawing;
using System.Windows.Forms;
using OmniWear.WinForms.Services;
using OmniWear.WinForms.Helpers;

namespace OmniWear.WinForms
{
    public partial class LoginForm : Form
    {
        private TextBox txtUsername;
        private TextBox txtPassword;
        private Button btnLogin;
        private ApiService _apiService;

        public LoginForm()
        {
            InitializeComponent();
            _apiService = new ApiService();
        }

        private void InitializeComponent()
        {
            this.Text = "OmniWear - Login";
            this.Size = new Size(400, 300);
            this.StartPosition = FormStartPosition.CenterScreen;
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            this.MaximizeBox = false;

            Label lblTitle = new Label { Text = "OMNIWEAR", Font = new Font("Segoe UI", 24, FontStyle.Bold), Location = new Point(90, 30), AutoSize = true };
            
            Label lblUser = new Label { Text = "Username:", Location = new Point(50, 100), AutoSize = true };
            txtUsername = new TextBox { Location = new Point(140, 97), Width = 180 };

            Label lblPass = new Label { Text = "Password:", Location = new Point(50, 140), AutoSize = true };
            txtPassword = new TextBox { Location = new Point(140, 137), Width = 180, PasswordChar = '*' };

            btnLogin = new Button { Text = "LOGIN", Location = new Point(140, 180), Width = 180, Height = 40, BackColor = Color.Black, ForeColor = Color.White };
            btnLogin.Click += BtnLogin_Click;

            this.Controls.Add(lblTitle);
            this.Controls.Add(lblUser);
            this.Controls.Add(txtUsername);
            this.Controls.Add(lblPass);
            this.Controls.Add(txtPassword);
            this.Controls.Add(btnLogin);
        }

        private async void BtnLogin_Click(object? sender, EventArgs e)
        {
            btnLogin.Enabled = false;
            btnLogin.Text = "Logging in...";

            var result = await _apiService.LoginAsync(txtUsername.Text, txtPassword.Text);

            if (result.success)
            {
                GlobalState.JwtToken = result.token;
                GlobalState.Role = result.role;

                this.Hide();
                var mainForm = new MainLayoutForm();
                mainForm.FormClosed += (s, args) => this.Close();
                mainForm.Show();
            }
            else
            {
                UIHelper.ShowError(result.error);
                btnLogin.Enabled = true;
                btnLogin.Text = "LOGIN";
            }
        }
    }
}
