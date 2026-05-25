using System;
using System.Windows;
using System.Windows.Controls;
using GraphQL;
using GraphQL.Client.Http;
using GraphQL.Client.Serializer.Newtonsoft;

namespace OmniWear.Warehouse
{
    public partial class MainWindow : Window
    {
        private readonly GraphQLHttpClient _graphQLClient;
        private Product? _selectedProduct;

        public MainWindow()
        {
            InitializeComponent();
            
            // Connect to local Node.js GraphQL server
            _graphQLClient = new GraphQLHttpClient("http://localhost:4000/graphql", new NewtonsoftJsonSerializer());
            
            Loaded += async (s, e) => await LoadProductsAsync();
        }

        private async System.Threading.Tasks.Task LoadProductsAsync()
        {
            try
            {
                StatusText.Text = "Loading products...";
                
                var query = new GraphQLRequest
                {
                    Query = @"
                    query {
                        products {
                            id
                            title
                            price
                            category
                            inventory
                            image
                        }
                    }"
                };

                var response = await _graphQLClient.SendQueryAsync<ProductsResponse>(query);
                
                if (response.Errors != null && response.Errors.Length > 0)
                {
                    StatusText.Text = $"Error: {response.Errors[0].Message}";
                    StatusText.Foreground = System.Windows.Media.Brushes.Red;
                    return;
                }

                ProductsGrid.ItemsSource = response.Data.Products;
                StatusText.Text = "Products loaded successfully.";
                StatusText.Foreground = System.Windows.Media.Brushes.Green;
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Connection Error: {ex.Message}";
                StatusText.Foreground = System.Windows.Media.Brushes.Red;
            }
        }

        private void ProductsGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (ProductsGrid.SelectedItem is Product selected)
            {
                _selectedProduct = selected;
                SelectedProductNameText.Text = selected.Title;
                InventoryTextBox.Text = selected.Inventory.ToString();
            }
        }

        private async void UpdateButton_Click(object sender, RoutedEventArgs e)
        {
            if (_selectedProduct == null)
            {
                StatusText.Text = "Please select a product first.";
                StatusText.Foreground = System.Windows.Media.Brushes.Red;
                return;
            }

            if (!int.TryParse(InventoryTextBox.Text, out int newInventory) || newInventory < 0)
            {
                StatusText.Text = "Invalid inventory number.";
                StatusText.Foreground = System.Windows.Media.Brushes.Red;
                return;
            }

            try
            {
                StatusText.Text = "Updating...";
                StatusText.Foreground = System.Windows.Media.Brushes.Blue;

                var request = new GraphQLRequest
                {
                    Query = @"
                    mutation UpdateInventory($id: ID!, $newInventory: Int!) {
                        updateInventory(id: $id, newInventory: $newInventory) {
                            id
                            inventory
                        }
                    }",
                    Variables = new
                    {
                        id = _selectedProduct.Id,
                        newInventory = newInventory
                    }
                };

                var response = await _graphQLClient.SendMutationAsync<UpdateInventoryResponse>(request);

                if (response.Errors != null && response.Errors.Length > 0)
                {
                    StatusText.Text = $"Error: {response.Errors[0].Message}";
                    StatusText.Foreground = System.Windows.Media.Brushes.Red;
                    return;
                }

                StatusText.Text = "Inventory updated successfully!";
                StatusText.Foreground = System.Windows.Media.Brushes.Green;
                
                // Refresh data
                await LoadProductsAsync();
            }
            catch (Exception ex)
            {
                StatusText.Text = $"Update Error: {ex.Message}";
                StatusText.Foreground = System.Windows.Media.Brushes.Red;
            }
        }

        private async void RefreshButton_Click(object sender, RoutedEventArgs e)
        {
            await LoadProductsAsync();
        }
    }
}
