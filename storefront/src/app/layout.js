import "./globals.css";
import { ApolloWrapper } from "../lib/apollo-client";

export const metadata = {
  title: "OmniWear Store",
  description: "Your modern clothing destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>
          <header className="navbar">
            <div className="logo">OmniWear</div>
            <nav>
              <a href="/">Home</a>
              <a href="/cart">Cart</a>
            </nav>
          </header>
          <main className="container">{children}</main>
        </ApolloWrapper>
      </body>
    </html>
  );
}
