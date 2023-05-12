import Layout from "@/components/Layout";
import axios from "axios";
import { useEffect, useState } from "react";
import { withSwal } from "react-sweetalert2";

function Categories({ swal }) {
  {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState("");
    const [parentCategory, setParentCategory] = useState("");
    const [categories, setCategories] = useState([]);
    const [properties, setProperties] = useState([]);
    useEffect(() => {
      fetchCategories();
    }, []);
    function fetchCategories() {
      axios.get("/api/categories").then((result) => {
        setCategories(result.data);
      });
    }
    async function saveCategory(ev) {
      ev.preventDefault();
      const data = { name, parentCategory };
      if (editedCategory) {
        data._id = editedCategory._id;
        await axios.put("/api/categories", data);
        setEditedCategory(null);
      } else {
        await axios.post("/api/categories", data);
      }

      setName("");
      setParentCategory("");
      fetchCategories();
    }
    function editCategory(category) {
      setEditedCategory(category);
      setName(category.name);
      setParentCategory(category.parent?._id);
    }
    function deleteCategory(category) {
      swal
        .fire({
          title: "Are You Sure?",
          text: `Do you want to delete ${category.name}?`,
          showCancelButton: true,
          cancelButtonText: "Cancel",
          confirmButtonText: "Yes,Delete!",
          confirmButtonColor: "#d55",
          reverseButtons: true,
        })
        .then(async (result) => {
          //when confrim and promis resolved
          if (result.isConfirmed) {
            const { _id } = category;
            await axios.delete("/api/categories?_id=" + _id);
            fetchCategories();
          }
        });
    }
    function addProperty() {
      setProperties((prev) => {
        return [...prev, { name: "", values: "" }];
      });
    }
    return (
      <Layout>
        <h1>Categories</h1>
        <label>
          {editedCategory
            ? `Edit Category ${editedCategory.name}`
            : "Creat New Category"}
        </label>
        <form onSubmit={saveCategory}>
          <div className="flex gap-1">
            <input
              type="text"
              placeholder="Category Name"
              onChange={(ev) => setName(ev.target.value)}
              value={name}
            />
            <select
              onChange={(ev) => setParentCategory(ev.target.value)}
              value={parentCategory}
            >
              <option value="0">No Parent Category</option>
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}{" "}
                  </option>
                ))}
            </select>
          </div>
          <div className="mb-2">
            <label className="block">Properties</label>
            <button
              onClick={addProperty}
              type="button"
              className="btn-default text-sm"
            >
              Add new Property
            </button>
            {properties.length > 0 &&
              properties.map((property) => (
                <div key={property.name} className="flex gap-1">
                  <input
                    type="text"
                    placeholder="Property Name:(example color)"
                  />
                  <input type="text" placeholder="Values, comma separated" />
                </div>
              ))}
          </div>

          <button type="submit" className="btn btn-primary">
            Save
          </button>
        </form>
        <table className="basic mt-4">
          <thead>
            <tr>
              <td>Category Name</td>
              <td>Parent Category</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 &&
              categories.map((category) => (
                <tr key={category._id}>
                  <td>{category.name}</td>
                  <td>{category?.parent?.name}</td>
                  <td>
                    <div className="flex"></div>
                    <button
                      onClick={() => editCategory(category)}
                      className="btn-primary mr-1"
                    >
                      Edit
                    </button>
                    <button
                      className="btn-primary"
                      onClick={() => deleteCategory(category)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </Layout>
    );
  }
}

export default withSwal(({ swal }, ref) => (
  <Categories swal={swal}></Categories>
));
