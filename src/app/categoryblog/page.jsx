"use client";
import { GetBlogCategoriesAPI } from "@/util/blog";
import { useEffect, useState } from "react";

const CategoryBlogPage = () => {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchCategoriesBlog = async () => {
            try {
                const res = await GetBlogCategoriesAPI();
                setCategories(res.data);
                console.log("Fetched blog categories:", res.data);
            } catch (error) {
                console.error("Error fetching blog categories:", error);
            }
        };

        fetchCategoriesBlog();
    }, []);
    const handleDeleteBlogCategory = async (category) => {
        await DeleteCategory(category.id);
        alert("Xóa thành công: " + category.name);
        fetchCategoriesBlog();
    }
    return (
        <div>
            <h1 className="font-bold">Quản lý danh mục blog</h1>
           <table className="min-w-full bg-white">
            <tr className="w-full bg-gray-200 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                <td className="px-6 py-3">
                    <p> 
                        ID
                    </p>
                </td>
                <td className="px-6 py-3">
                    <p>
                        Tên danh mục
                    </p>
                </td>
                <td className="px-6 py-3">
                    <p>
                        Ngày tạo
                    </p>
                </td>
                <td className="px-6 py-3">
                    <p> Hành động </p>
                </td>
            </tr>
            
                {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50 ">
                        <td className="px-6 py-4 whitespace-nowrap">{category.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{category.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{new Date(category.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            
                            <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteBlogCategory(category)} > Xóa </button>
                        </td>
                    </tr>
                ))}
            
           </table>
        </div>
    );
};
export default CategoryBlogPage;