import Layout from "@/components/Layout";

export default function NewProduct() {
  return (
    <Layout>
      <h1>New Product</h1>
      <label>Product Name</label>
      <input type="text" placeholder="Product Name"></input>
      <label>Discription</label>
      <textarea placeholder="Discription"></textarea>
      <label>Price (in USD)</label>
      <input type="number" placeholder="Price" />
      <button className="btn-primary">Save</button>
    </Layout>
  );
}
