using System;
using System.Threading.Tasks;

namespace OmniWear.WinForms.Services
{
    public class ApiService
    {
        // Mock method to simulate GraphQL call for Authentication
        public async Task<(bool success, string token, string role, string error)> LoginAsync(string username, string password)
        {
            await Task.Delay(1000); // Simulate network delay

            if (username == "admin@omniwear.com" && password == "admin123")
                return (true, "mock_jwt_token_admin_123", "ADMIN", null);
            
            if (username == "staff@omniwear.com" && password == "staff123")
                return (true, "mock_jwt_token_staff_456", "STAFF", null);

            return (false, null, null, "Invalid username or password");
        }
    }
}
