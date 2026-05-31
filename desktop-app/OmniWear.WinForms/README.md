# 🖥️ GameHub Admin Management Console (WinForms Application)

Welcome to the desktop administration application for the **GameHub** platform, built using C# and .NET 8 Windows Forms (WinForms). This tool is designed to be used by support staff and warehouse operators to manage digital activation licenses, audit orders, and handle platform user controls offline.

---

## 📂 Project Directory Structure

```
OmniWear.WinForms/
├── Program.cs                  # Windows Application initialization & entry point
├── LoginForm.cs                # Gamer/Admin credentials login portal
├── MainLayoutForm.cs           # Main layout containing navigation sidebar
├── UserControls/
│   ├── EmployeeManagementUC.cs # Interface for monitoring employees & support roles
│   └── ProductManagementUC.cs  # Interface for editing database games & CD-keys
├── Services/
│   └── ApiService.cs           # API consumer queries, mutations, and local state mockups
├── Helpers/
│   └── UIHelper.cs             # Styling utilities for DataGridView layouts
└── OmniWear.WinForms.csproj    # MSBuild .NET 8 configuration file
```

---

## 🛠️ Tech Stack & Packages

* **`.NET 8.0 Windows Desktop SDK`**: The underlying engine providing base classes for UI elements (Forms, Buttons, TextBoxes, DataGridView).
* **`GraphQL.Client`**: Consumer client libraries used to query/mutate records on the GraphQL API engine asynchronously.
* **`Newtonsoft.Json`**: Serialization/Deserialization engine processing JSON network payloads.

---

## ⚙️ App Workflow (Under the Hood)

1. **Bootstrapping:** `Program.cs` triggers the Windows UI thread and loads the initial `LoginForm`.
2. **Credential Handshake:** 
   * The inputs are processed by `ApiService.LoginAsync()`, which contacts the GraphQL backend API.
   * If successful, the JSON Web Token (JWT) is stored in the static `GlobalState` configuration to authorise all future requests, and the app transitions into `MainLayoutForm`.
3. **Single-Page Application Shell:**
   * Instead of spawning dozens of pop-up dialog boxes, `MainLayoutForm` leverages a sidebar on the left and a generic `Panel` (mainContentPanel) on the right.
   * Clicking different side menus instantly discards the current panel and instantiates a new `UserControl` dynamically inside the main panel, providing a modern web-like experience on desktop.
4. **Style Abstraction:** All common grid rendering designs, row heights, and click event callbacks are configured in `Helpers.UIHelper.cs`, keeping views clean and consistent.

---

## 🚀 How to Run

### Prerequisites
* Windows OS (or Wine environment if running on Linux)
* **.NET 8.0 SDK** (installed locally)

### Steps
1. **Via Command Line:**
   ```bash
   dotnet run
   ```
2. **Via IDE:** Open `OmniWear.WinForms.csproj` inside Microsoft Visual Studio 2022 and press **F5 (Start Debugging)**.
