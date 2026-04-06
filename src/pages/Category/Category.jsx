import { useState, useEffect } from "react"
import CategoryModal from "./CategoryModal/CategoryModal"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import TopPart from "../../components/TopPart/TopPart"
import Button from "../../components/Button/Button"
import styles from "./Category.module.css"
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../services/CategoryService"

const Category = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [categoryToDelete, setCategoryToDelete] = useState(null)
  const [categories, setCategories] = useState([])

  const fetchCategories = async () => {
    try {
      const data = await getCategories()
      setCategories(data)
    } catch (error) {
      console.error("Error fetching categories", error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchCategories()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedCategory(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (category) => {
    setSelectedCategory(category)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (category) => {
    setCategoryToDelete(category)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedCategory(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setCategoryToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await deleteCategory(categoryToDelete.id)
        await fetchCategories()
        closeDeleteModal()
      } catch (error) {
        console.error("Error deleting category", error)
      }
    }
  }

  const handleCategorySubmit = async (data) => {
    if (data.Id != null) {
      try {
        await updateCategory(data)
        await fetchCategories()
        closeDefaultModal()
      } catch (error) {
        console.error("Error updating category", error)
      }
    } else {
      try {
        await addCategory(data)
        await fetchCategories()
        closeDefaultModal()
      } catch (error) {
        console.error("Error adding category", error)
      }
    }
  }

  return (
    <section className={styles.page} aria-label="قائمة التصنيفات">
      <TopPart title="التصنيفات">
        <Button text="إضافة تصنيف" onClick={openAddModal} />
      </TopPart>

      <ul className={styles.list}>
        {categories.map((category) => (
          <li key={category.id} className={styles.item}>
            <span className={styles.name}>{category.name}</span>

            <span className={styles.actions}>
              <Button
                text="تعديل"
                onClick={() => openEditModal(category)}
                variant="secondary"
              />
              <Button
                text="حذف"
                onClick={() => openDeleteModal(category)}
                variant="danger"
              />
            </span>
          </li>
        ))}
      </ul>

      <CategoryModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        category={selectedCategory}
        onSubmit={handleCategorySubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف التصنيف"
        message={
          categoryToDelete
            ? `هل أنت متأكد من حذف التصنيف "${categoryToDelete.name}"؟`
            : ""
        }
      />
    </section>
  )
}

export default Category