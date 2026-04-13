import { useState, useEffect } from "react"
import CategoryModal from "./CategoryModal/CategoryModal"
import DeleteModal from "../../../components/common/DeleteModal/DeleteModal"
import TopPart from "../../../components/common/TopPart/TopPart"
import Button from "../../../components/common/Button/Button"
import styles from "./Category.module.css"
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../../../services/CategoryService"

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
    if (!categoryToDelete) return

    try {
      await deleteCategory(categoryToDelete.id)
      await fetchCategories()
      closeDeleteModal()
    } catch (error) {
      console.error("Error deleting category", error)
    }
  }

  const handleCategorySubmit = async (data) => {
    try {
      if (data.Id != null) {
        await updateCategory(data)
      } else {
        await addCategory(data)
      }

      await fetchCategories()
      closeDefaultModal()
    } catch (error) {
      console.error("Error saving category", error)
    }
  }

  return (
    <section className={styles.page} aria-label="قائمة الفئات">
      <TopPart title="الفئات">
        <Button text="إضافة فئة" onClick={openAddModal} />
      </TopPart>

      {categories.length === 0 ? (
        <div className={styles.emptyState}>لا توجد فئات حالياً</div>
      ) : (
        <div className={styles.grid}>
          {categories.map((category) => (
            <article key={category.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.badge}>فئة</div>
              </div>

              {category.imageUrl ? (
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className={styles.cardImage}
                />
              ) : null}

              <h2 className={styles.name}>{category.name}</h2>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => openEditModal(category)}
                >
                  تعديل
                </button>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => openDeleteModal(category)}
                >
                  حذف
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

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
        title="حذف الفئة"
        message={
          categoryToDelete
            ? `هل أنت متأكد من حذف الفئة "${categoryToDelete.name}"؟`
            : ""
        }
      />
    </section>
  )
}

export default Category