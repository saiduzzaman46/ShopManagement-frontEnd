"use client";

export default function AddProductPage() {
  function handelSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    console.log(event);
  }
  return (
    <form action="#" method="POST" onSubmit={handelSubmit}>
      <h2>Add Product</h2>

      <div>
        <label>Title:</label>
        <input type="text" name="title" />
      </div>

      <div>
        <label>Description:</label>
        <textarea name="description"></textarea>
      </div>

      <div>
        <label>Price:</label>
        <input type="number" name="price" />
      </div>

      <div>
        <label>Quantity:</label>
        <input type="number" name="quantity" />
      </div>

      <div>
        <label>Category:</label>
        <select name="categoryId">
          <option value="">Select Category</option>
          <option value="cat1">Electronics</option>
          <option value="cat2">Clothing</option>
          <option value="cat3">Books</option>
        </select>
      </div>

      <div>
        <label>Brand:</label>
        <select name="brandId">
          <option value="">Select Brand</option>
          <option value="br1">Apple</option>
          <option value="br2">Samsung</option>
          <option value="br3">Nike</option>
        </select>
      </div>

      <button type="submit">Add Product</button>
    </form>
  );
}
