import { useEffect } from "react";

// Custom hook untuk menangani animasi saat elemen masuk ke layar
// Menerima dependency array untuk dijalankan ulang saat data berubah
const useScrollAnimation = (dependencies = []) => {
  useEffect(() => {
    // Fungsi ini akan mencari dan mengamati elemen
    const observeElements = () => {
      const observer = new IntersectionObserver(
        (entries, obs) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              obs.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.1,
        }
      );

      const elements = document.querySelectorAll(".animate-on-scroll");
      elements.forEach((el) => observer.observe(el));

      // Return cleanup function
      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    };

    // Panggil fungsi observe setelah delay singkat untuk memastikan DOM sudah ter-update
    const timeoutId = setTimeout(observeElements, 50);

    // Cleanup function utama
    return () => {
      clearTimeout(timeoutId);
      // Logika cleanup dari observeElements akan berjalan saat dipanggil
    };
  }, [...dependencies]); // Jalankan ulang effect setiap kali dependency berubah
};

export default useScrollAnimation;
