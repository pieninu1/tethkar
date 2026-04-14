import { useEffect, useState } from "react"
import HeroBannerModal from "./HeroBannerModal/HeroBannerModal"
import DeleteModal from "../../../components/common/DeleteModal/DeleteModal"
import TopPart from "../../../components/common/TopPart/TopPart"
import Button from "../../../components/common/Button/Button"
import styles from "./HeroBanner.module.css"
import {
  getHeroBanners,
  addHeroBanner,
  updateHeroBanner,
  deleteHeroBanner,
} from "../../../services/HeroBannerService"

function HeroBanner() {
  const [defaultModalOpen, setDefaultModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState(null)
  const [bannerToDelete, setBannerToDelete] = useState(null)
  const [banners, setBanners] = useState([])

  const fetchBanners = async () => {
    try {
      const data = await getHeroBanners()
      setBanners(data)
    } catch (error) {
      console.error("Error fetching hero banners", error)
    }
  }

  useEffect(() => {
    ;(async () => {
      await fetchBanners()
    })()
  }, [])

  const openAddModal = () => {
    setSelectedBanner(null)
    setDefaultModalOpen(true)
  }

  const openEditModal = (banner) => {
    setSelectedBanner(banner)
    setDefaultModalOpen(true)
  }

  const openDeleteModal = (banner) => {
    setBannerToDelete(banner)
    setDeleteModalOpen(true)
  }

  const closeDefaultModal = () => {
    setDefaultModalOpen(false)
    setSelectedBanner(null)
  }

  const closeDeleteModal = () => {
    setDeleteModalOpen(false)
    setBannerToDelete(null)
  }

  const handleConfirmDelete = async () => {
    if (!bannerToDelete) return

    try {
      await deleteHeroBanner(bannerToDelete.id)
      await fetchBanners()
      closeDeleteModal()
    } catch (error) {
      console.error("Error deleting hero banner", error)
    }
  }

  const handleBannerSubmit = async (data) => {
    try {
      if (data.Id != null) {
        await updateHeroBanner(data)
      } else {
        await addHeroBanner(data)
      }

      await fetchBanners()
      closeDefaultModal()
    } catch (error) {
      console.error("Error saving hero banner", error)
    }
  }

  return (
    <section className={styles.page} aria-label="قائمة البنرات الرئيسية">
      <TopPart title="البنرات الرئيسية">
        <Button text="إضافة بنر" onClick={openAddModal} />
      </TopPart>

      {banners.length === 0 ? (
        <div className={styles.emptyState}>لا توجد بنرات حالياً</div>
      ) : (
        <div className={styles.grid}>
          {banners.map((banner) => (
            <article key={banner.id} className={styles.card}>
              <div className={styles.cardTop}>
                <div className={styles.badge}>
                  {banner.isActive ? "نشط" : "غير نشط"}
                </div>

                <div className={styles.orderBadge}>
                  الترتيب: {banner.displayOrder}
                </div>
              </div>

              {banner.imageUrl ? (
                <img
                  src={banner.imageUrl}
                  alt={banner.title}
                  className={styles.cardImage}
                />
              ) : null}

              <div className={styles.textBlock}>
                <h2 className={styles.title}>{banner.title}</h2>
                <p className={styles.subtitle}>{banner.subtitle}</p>
                <p className={styles.meta}>
                  الزر: {banner.buttonText || "احجز الآن"}
                </p>
              </div>

              <div className={styles.actions}>
                <button
                  type="button"
                  className={styles.editBtn}
                  onClick={() => openEditModal(banner)}
                >
                  تعديل
                </button>

                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={() => openDeleteModal(banner)}
                >
                  حذف
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      <HeroBannerModal
        isOpen={defaultModalOpen}
        onClose={closeDefaultModal}
        banner={selectedBanner}
        onSubmit={handleBannerSubmit}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={handleConfirmDelete}
        title="حذف البنر"
        message={
          bannerToDelete
            ? `هل أنت متأكد من حذف البنر "${bannerToDelete.title}"؟`
            : ""
        }
      />
    </section>
  )
}

export default HeroBanner