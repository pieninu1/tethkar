import ProfileMenu from "../../components/ProfileMenu/ProfileMenu";
import SectionCard from "../../components/SectionCard/SectionCard";
import InfoRow from "../../components/InfoRow/InfoRow";
import styles from "./Profile.module.css";

const Profile = () => {
  const accountInfo = {
    email: "Sarah223@gmail.com",
    createdAt: "1 مارس 2026",
  };

  const personalInfo = {
    name: "سارة أحمد",
    phone: "-",
    gender: "أنثى",
    nationality: "-",
    residence: "السعودية",
  };

  return (
    <section className={styles.page}>
      <div className={styles.content}>
        <div className={styles.mainSection}>
          <SectionCard title="معلومات الحساب">
            <InfoRow label="البريد الإلكتروني" value={accountInfo.email} />
            <InfoRow label="تاريخ الإنشاء" value={accountInfo.createdAt} />
          </SectionCard>

          <SectionCard title="المعلومات الشخصية" actionText="تعديل">
            <InfoRow label="الاسم" value={personalInfo.name} />
            <InfoRow label="رقم الجوال" value={personalInfo.phone} />
            <InfoRow label="الجنس" value={personalInfo.gender} />
            <InfoRow label="الجنسية" value={personalInfo.nationality} />
            <InfoRow label="الإقامة" value={personalInfo.residence} />
          </SectionCard>
        </div>

        <ProfileMenu
          name="سارة أحمد"
          email="Sarah223@gmail.com"
        />
      </div>
    </section>
  );
};

export default Profile;