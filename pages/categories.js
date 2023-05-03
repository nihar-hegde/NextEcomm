import Layout from "@/components/Layout";

export default function Categories() {
  return (
    <Layout>
      <h1>Categories</h1>
      <label htmlFor="">New Category name</label>
      <form onSubmit={saveCategory} className="flex gap-1">
        <input className="mb-0" type="text" placeholder="Category Name" />
        <button type="submit" className="btn btn-primary">
          Save
        </button>
      </form>
    </Layout>
  );
}
