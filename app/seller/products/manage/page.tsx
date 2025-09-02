import Link from "next/link";

const products = [
  {
    productId: "1a2b3c4d-1111-2222-3333-444455556666",
    title: "Wireless Bluetooth Headphones",
    description: "Noise-cancelling over-ear headphones with long battery life.",
    price: 129.99,
    quantity: 50,
    images: [
      "https://example.com/images/headphones1.png",
      "https://example.com/images/headphones2.png",
    ],
    tags: "electronics,audio,wireless",
    createdAt: new Date(),
    seller: {
      sellerId: "001",
      name: "TechWorld",
    },
    category: {
      name: "Electronics",
    },
    brand: {
      name: "Sony",
    },
  },
  {
    productId: "7d8e9f0a-2222-3333-4444-555566667777",
    title: "Gaming Laptop",
    description: "High-performance laptop with RTX graphics and SSD storage.",
    price: 1599.99,
    quantity: 20,
    images: ["https://example.com/images/laptop1.png"],
    tags: "electronics,computer,gaming",
    createdAt: new Date(),
    seller: {
      sellerId: "001",
      name: "GamerZone",
    },
    category: {
      name: "Computers",
    },
    brand: {
      name: "Asus",
    },
  },
  {
    productId: "8b9c0d1e-3333-4444-5555-666677778888",
    title: "Running Shoes",
    description: "Lightweight running shoes with breathable mesh design.",
    price: 89.99,
    quantity: 100,
    images: ["https://example.com/images/shoes1.png"],
    tags: "fashion,shoes,sports",
    createdAt: new Date(),
    seller: {
      sellerId: "002",
      name: "SportyLife",
    },
    category: {
      name: "Footwear",
    },
    brand: {
      name: "Nike",
    },
  },
  {
    productId: "9c0d1e2f-4444-5555-6666-777788889999",
    title: "Smartwatch",
    description:
      "Feature-packed smartwatch with fitness tracking and notifications.",
    price: 199.99,
    quantity: 75,
    images: ["https://example.com/images/smartwatch1.png"],
    tags: "electronics,wearable,fitness",
    createdAt: new Date(),
    seller: {
      sellerId: "003",
      name: "GadgetHub",
    },
    category: {
      name: "Wearables",
    },
    brand: {
      name: "Apple",
    },
  },
];

export default function ManageProduct() {
  return (
    <>
      <h2>Manage Products</h2>
      <table>
        <thead>
          <tr>
            {/* <th>Product ID</th> */}
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductRow key={product.productId} product={product} />
          ))}
        </tbody>
      </table>
    </>
  );
}

function ProductRow({ product }: { product: (typeof products)[0] }) {
  return (
    <tr>
      {/* <td>{product.productId}</td> */}
      <td>{product.title}</td>
      <td>{product.description}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>{product.category.name}</td>
      <td>{product.brand.name}</td>
      <td>
        <ActionButtons productId={product.productId} />
      </td>
    </tr>
  );
}

function ActionButtons({ productId }: { productId: string }) {
  return (
    <div>
      <Link href={`/seller/products/manage/update/${productId}`}>Edit</Link>
      <button>Delete</button>
    </div>
  );
}
