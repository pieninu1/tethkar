import { useState, useEffect } from "react"
import CityModal from "./CityModal/CityModal"
import DeleteModal from "../../../components/common/DeleteModal/DeleteModal"
import TopPart from "../../../components/common/TopPart/TopPart"
import Button from "../../../components/common/Button/Button"
import styles from "./City.module.css"
import { getCities, deleteCity } from "../../../services/CityService"

const City = () => {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedCity, setSelectedCity] = useState(null)
  const [cityToDelete, setCityToDelete] = useState(null)
  const [cities, setCities] = useState([])

  const fetchCities = async () => {
    try {
      const data = await getCities()
      setCities(data)
    } catch (error) {
      console.error("Error fetching cities", error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchCities()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedCity(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (city) => {
    setSelectedCity(city)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (city) => {
    setCityToDelete(city)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedCity(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setCityToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!cityToDelete) return

    try {
      await deleteCity(cityToDelete.id)
      await fetchCities()
      closeDeleteModal()
    } catch (error) {
      console.error("Error deleting city", error)
    }
  }

  // local UI testing version
  const handleCitySubmit = async (data) => {
    if (data.Id != null) {
      setCities((prev) =>
        prev.map((item) =>
          item.id === data.Id ? { ...item, name: data.Name } : item
        )
      )
    } else {
      setCities((prev) => [
        {
          id: Date.now(),
          name: data.Name,
        },
        ...prev,
      ])
    }

    closeDefaultModal()
  }

  return (
    <section className={styles.page} aria-label="قائمة المدن">
      <TopPart title="المدن">
        <Button text="إضافة مدينة" onClick={openAddModal} />
      </TopPart>

      {cities.length === 0 ? (
        <div className={styles.emptyState}>لا توجد مدن حالياً</div>
      ) : (
        <div className={styles.grid}>
          {cities.map((city) => (
            <article key={city.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.badge}>مدينة</div>
              </div>

              <h2 className={styles.name}>{city.name}</h2>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => openEditModal(city)}
                >
                  تعديل
                </button>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => openDeleteModal(city)}
                >
                  حذف
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <CityModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        city={selectedCity}
        onSubmit={handleCitySubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف المدينة"
        message={cityToDelete ? `هل أنت متأكد من حذف المدينة "${cityToDelete.name}"؟` : ""}
      />
    </section>
  )
}

export default City