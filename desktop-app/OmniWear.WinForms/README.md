# OmniWear WinForms Application

This directory contains the desktop application for OmniWear, built using C# and .NET 8 Windows Forms (WinForms). It is designed to be used by administrative and warehouse staff for managing inventory, viewing orders, and controlling employee access.

## Directory Structure

```
OmniWear.WinForms/
├── Program.cs                  # Application entry point
├── LoginForm.cs                # Initial authentication window
├── MainLayoutForm.cs           # The main shell/container after login
├── UserControls/               # Reusable view panels (Views)
│   ├── EmployeeManagementUC.cs # Interface for managing staff
│   └── ProductManagementUC.cs  # Interface for managing products/inventory
├── Services/                   # Service Layer (Business/API Logic)
│   └── ApiService.cs           # Handles network requests and mock data retrieval
├── Helpers/                    # Shared utility methods
│   └── UIHelper.cs             # Configures DataGridViews and Message dialogs
└── OmniWear.WinForms.csproj    # Project file defining .NET 8 SDK
```

## Packages Used

- **`Microsoft.NET.Sdk.WindowsDesktop`**: The core .NET SDK used for building Windows desktop applications. It provides the base `System.Windows.Forms` namespaces and UI controls (Buttons, TextBoxes, DataGridViews).
- *(Note: External packages like `GraphQL.Client` or `Newtonsoft.Json` would be added here when connecting the mock services to the live backend API).*

## How It Works (Mechanism)

1. **Application Lifecycle**: The application starts in `Program.cs`, which initializes WinForms settings and launches the `LoginForm`.
2. **Authentication**: 
   - The user inputs their credentials in the `LoginForm`.
   - Instead of checking hardcoded strings directly in the button click event, the form calls `ApiService.LoginAsync()`. 
   - The service securely validates the credentials (simulated via `Task.Delay` and mock JWTs). 
   - On success, the JWT token and User Role are stored in a static `GlobalState` class, and the `LoginForm` transitions to the `MainLayoutForm`.
3. **Shell Architecture**: `MainLayoutForm` acts as a shell. It contains a static sidebar navigation menu on the left and an empty `Panel` (mainContentPanel) on the right.
4. **Dynamic UserControls (Routing equivalent)**: 
   - When a user clicks a button in the sidebar (e.g., "Products"), the `MainLayoutForm` clears the `mainContentPanel` and dynamically instantiates a new `UserControl` (e.g., `ProductManagementUC`).
   - This approach prevents popping up dozens of new windows and creates a modern Single-Page Application (SPA) feel inside a desktop environment.
5. **UI Abstraction**: Visual configuration (like making `DataGridView` columns stretch to fill the screen or removing row headers) is handled centrally by `Helpers.UIHelper`. This ensures consistency across all management panels.
