# 🛒 Angular E-Commerce Lab4

A modern, feature-rich e-commerce web application built with **Angular** and **PrimeNG**.  
This project demonstrates best practices in Angular development, UI design, and state management.

---

## 🚀 Technologies Used

- **Angular 19** — Standalone components, signals, guards, pipes, and modern Angular features
- **PrimeNG** — UI component library for Angular (tables, toasts, messages, rating, etc.)
- **RxJS** — Reactive programming for data streams and subscriptions
- **TypeScript** — Strongly typed JavaScript for scalable code
- **SCSS** — Modular and maintainable styling
- **Angular CLI** — Project scaffolding, building, and testing

---

## ✨ Features

- **User Authentication**
  - Login and registration forms with validation
  - Route guards for protected pages

- **Product Catalog**
  - Product listing with search and filtering
  - Responsive product cards with images, ratings, and categories
  - Product details page with image gallery, stock status, and full description

- **Shopping Cart**
  - Add, remove, and update product quantities
  - Cart persists quantities and updates dynamically
  - Total price calculation with currency formatting

- **UI/UX Enhancements**
  - PrimeNG components: tables, buttons, messages, toasts, rating, progress spinner, etc.
  - Toast notifications for cart actions and errors
  - Responsive and modern SCSS-based design

- **Best Practices**
  - Angular signals for state management
  - Standalone components and lazy loading for performance
  - Modular service architecture (ProductService, CartService, etc.)
  - Type-safe interfaces for all data models

---

## 🖥️ Getting Started (If Downloaded)

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
   ```bash
   ng serve
   ```
   Visit [http://localhost:4200](http://localhost:4200) in your browser.

---

## 🧩 Project Structure

```
src/
  app/
    components/
      products/
        cart/
        single-product/
        single-product-details/
      login/
      register/
    services/
    pipes/
    guards/
  assets/
  styles/
```

---

## 🛠️ Scripts

- **Start Dev Server:** `ng serve`
- **Build for Production:** `ng build`
- **Run Unit Tests:** `ng test`
- **Generate Component:** `ng generate component component-name`

---

## 📚 Further Reading

- [Angular Documentation](https://angular.dev/docs)
- [PrimeNG Documentation](https://primeng.org/)
- [Angular CLI Reference](https://angular.dev/tools/cli)

---

## 💡 Author & License

Created by Ahmed.G 