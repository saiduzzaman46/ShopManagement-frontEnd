export default function CreateSellerForm() {
  return (
    <main style={{ padding: "2rem" }}>
      <h1>Create Seller Account</h1>
      <form action="/login" method="POST" encType="multipart/form-data">
        <div>
          <label>Full Name:</label>
          <input type="text" name="fullName" />
        </div>

        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" name="phone" />
        </div>

        <div>
          <label>NID:</label>
          <input type="text" name="nid" />
        </div>

        <div>
          <label>NID Image(s):</label>
          <input type="file" name="nidImage" multiple />
        </div>

        <div>
          <label>Address:</label>
          <input type="text" name="address" />
        </div>

        <div>
          <label>Store Name:</label>
          <input type="text" name="storeName" />
        </div>

        <button type="submit">Submid</button>
      </form>
    </main>
  );
}
