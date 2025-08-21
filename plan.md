Below is a detailed plan outlining every change and dependent file to address the requested features. You’ll be modifying navigation, adding new pages, updating existing ones, and creating an API to export user profile data to Excel.

---

**1. Navigation & Menu Updates**  
- **File to Modify:** src/components/ui/sidebar.tsx (or your navigation component file)  
  - Locate the menu item for “Find Nearby Farms.”  
  - Remove or comment out the old “Find Nearby Farms” entry.  
  - Add a new menu item labeled “Find Farms” that navigates to the new page (e.g. link to “/find-farms”).  
  - Ensure error handling by validating that the route exists before rendering the link.

---

**2. Create the “Find Farms” Page**  
- **File to Create:** src/app/find-farms/page.tsx  
  - Build a modern UI with a search bar for location input.  
  - Display a list of nearby farm results with clean typography and spacing.  
  - Use Tailwind CSS classes for modern styling.  
  - Implement loading and error states if the data fetch fails (e.g. “No farms found”).  
  - (Optional) Add a placeholder image using a template literal if needed:  
    `<img src={"https://placehold.co/800x600?text=Stylish+farm+landscape+in+minimalist+design"} alt="Stylish farm landscape in minimalist design" onError={(e) => e.target.style.display='none'} />`

---

**3. Implement Shop & Cart Functionality**  

*3.1 Create the Shop Page:*  
- **File to Create:** src/app/shop/page.tsx  
  - Lay out a grid of product cards with product name, description, price, and an “Add to Cart” button.  
  - Use modern spacing and typography using Tailwind CSS.  
  - Connect the “Add to Cart” button with a cart context (to be created in step 3.3).  
  - Handle errors for data retrieval (e.g. show “No products available” message).

*3.2 Create the Cart Page:*  
- **File to Create:** src/app/cart/page.tsx  
  - Display cart items in a list/table with quantity selectors and a “Remove” option.  
  - Provide a “Checkout” button at the bottom with proper error handling if the cart is empty or if update fails.
  
*3.3 Create a Cart Context:*  
- **File to Create:** src/lib/cartContext.tsx  
  - Implement a React Context to manage shared state for cart items (add, remove, update quantities).  
  - Include error boundaries and default empty state handling.

---

**4. Update the Seller Page**  
- **File to Modify:** src/app/seller/page.tsx  
  - Remove any static sample data currently in use.  
  - Replace it with either a fetch from a real endpoint or display a friendly “No seller data available” state when no data is found.  
  - Add error handling for data fetch failures and loading states.

---

**5. Profile Export Functionality (Export to Excel)**  

*5.1 Update or Create the Profile Page:*  
- **File to Create:** src/app/profile/page.tsx  
  - Display user profile details (name, email, etc.) in a clean form.  
  - Add a styled “Export to Excel” button (modern button design using Tailwind CSS).  
  - On click, trigger a client-side function to call the new API route.

*5.2 Create the Excel Export API Endpoint:*  
- **File to Create:** src/app/api/exportProfile/route.ts  
  - Use the “xlsx” library to generate an Excel workbook containing the profile/user data.  
  - Set HTTP headers (Content-Type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" and Content-Disposition) to force download.  
  - Include try-catch blocks for proper error handling, returning a 500 error with a JSON message if generation fails.

*5.3 Dependency Management:*  
- **File to Update:** package.json  
  - Add the “xlsx” library dependency (e.g. run `npm install xlsx`) if it is not already present.

---

**6. Additional Utility & Best Practices**  
- Update src/lib/utils.ts (if needed) with helper methods for error notifications or API error processing.  
- Ensure all newly created pages/components include proper error handling (using try/catch, conditional render of loading or error states) and fallback UI.  
- Follow Tailwind CSS for typography, colors, spacing, and layout consistency.  
- Test the new API endpoint using curl (e.g., `curl -X GET http://localhost:3000/api/exportProfile`) to verify HTTP status codes and file output.

---

**Summary**  
- Update the navigation sidebar by removing the old “Find Nearby Farms” and adding a “Find Farms” item linked to /find-farms.  
- Create new pages for “Find Farms,” “Shop,” “Cart,” and a profile page with an Excel export button.  
- Develop a cart context in src/lib/cartContext.tsx for state management.  
- Update the seller page to remove sample static data and introduce dynamic or empty state handling.  
- Implement an API endpoint using the xlsx library to generate and download an Excel file of profile data.  
- Ensure error handling, modern UI design, and consistency in Tailwind CSS styling across all changes.
