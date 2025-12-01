// Main JavaScript for ProRemont website
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const headerContacts = document.querySelector('.header-contacts');

    burger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isActive = burger.classList.toggle('active');
        
        if (isActive) {
            // Open menu
            navLinks.classList.add('active');
            headerContacts.classList.add('active');
            document.body.style.overflow = 'hidden';
        } else {
            // Close menu
            navLinks.classList.remove('active');
            headerContacts.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        const header = document.querySelector('.header');
        if (!header.contains(e.target) && burger.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && burger.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    function closeMobileMenu() {
        burger.classList.remove('active');
        navLinks.classList.remove('active');
        headerContacts.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Close mobile menu if open
                closeMobileMenu();
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = '#fff';
            header.style.backdropFilter = 'none';
        }
    });

    // Portfolio filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // Modal functionality for consultation form
    const consultationModal = document.getElementById('consultationModal');
    const closeBtn = consultationModal ? consultationModal.querySelector('.close') : null;
    
    // Кнопки, которые открывают модальное окно
    const callbackBtn = document.querySelector('.callback-btn');
    const ctaButton = document.querySelector('.cta-button');
    const consultationSubmitBtn = document.querySelector('.consultation .submit-btn');
    
    // Функции для открытия/закрытия модального окна
    function openConsultationModal() {
        if (consultationModal) {
            consultationModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
    }
    
    function closeConsultationModal() {
        if (consultationModal) {
            consultationModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }
    
    // Обработчики для кнопок
    if (callbackBtn) {
        callbackBtn.addEventListener('click', openConsultationModal);
    }
    
    if (ctaButton) {
        ctaButton.addEventListener('click', openConsultationModal);
    }
    
    // Закрытие модального окна
    if (closeBtn) {
        closeBtn.addEventListener('click', closeConsultationModal);
    }
    
    // Закрытие при клике вне окна
    window.addEventListener('click', (e) => {
        if (e.target === consultationModal) {
            closeConsultationModal();
        }
    });
    
    // Закрытие на Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && consultationModal && consultationModal.style.display === 'block') {
            closeConsultationModal();
        }
    });

    // Phone input mask
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    
    phoneInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 0) {
                if (value[0] === '7' || value[0] === '8') {
                    value = value.substring(1);
                }
                value = '+7 (' + value.substring(0, 3) + ') ' + value.substring(3, 6) + '-' + value.substring(6, 8) + '-' + value.substring(8, 10);
            }
            e.target.value = value;
        });
    });

    // Gallery functionality
    const galleryModal = document.getElementById('galleryModal');
    
    if (galleryModal) {
        const galleryMainImage = document.getElementById('galleryMainImage');
        const galleryTitle = document.getElementById('galleryTitle');
        const galleryDescription = document.getElementById('galleryDescription');
        const galleryThumbs = document.querySelector('.gallery-thumbs');
        const closeGallery = galleryModal.querySelector('.close');
        const prevBtn = document.querySelector('.gallery-prev');
        const nextBtn = document.querySelector('.gallery-next');
        
        let currentProject = null;
        let currentImageIndex = 0;

        // Projects data
        const projectsData = {
            // КАПИТАЛЬНЫЙ РЕМОНТ
            capital_1room_37: {
                title: "1-комнатная квартира - Капитальный ремонт",
                description: "37 м². Полная перепланировка с заменой всех инженерных систем. 3 фото.",
                images: generateImagePaths("capital/1room_37", 3)
            },
            capital_2room_42: {
                title: "2-комнатная квартира - Капитальный ремонт",
                description: "42 м². Полная перепланировка с заменой всех инженерных систем. 5 фото.",
                images: generateImagePaths("capital/2room_42", 5)
            },
            capital_4room_72: {
                title: "4-комнатная квартира - Капитальный ремонт",
                description: "72 м². Просторная квартира с полной перепланировкой. 7 фото.",
                images: generateImagePaths("capital/4room_72", 7)
            },

            // ЕВРОРЕМОНТ
            euro_2room: {
                title: "2-комнатная квартира - Евроремонт", 
                description: "65 м². Современный дизайн и функциональное пространство. 9 фото.",
                images: generateImagePaths("euro/2room", 9)
            },
            euro_3room: {
                title: "3-комнатная квартира - Евроремонт",
                description: "85 м². Просторная квартира с европейским качеством отделки. 4 фото.",
                images: generateImagePaths("euro/3room", 4)
            },
            euro_3room_56: {
                title: "3-комнатная квартира - Евроремонт",
                description: "56 м². Качественные материалы и современные решения. 6 фото.",
                images: generateImagePaths("euro/3room_56", 6)
            },

            // РЕМОНТ НЕЖИЛЫХ ПОМЕЩЕНИЙ
            commercial_office1: {
                title: "Офисное помещение - Концепция дизайна",
                description: "120 м². Пробная версия дизайна - проект в разработке. 4 концепт-изображения.",
                images: generateImagePaths("commercial/office1", 4)
            },

            // ДИЗАЙНЕРСКИЙ РЕМОНТ
            designer_1room: {
                title: "1-комнатная квартира - Дизайнерский ремонт",
                description: "45 м². Авторский дизайн-проект и индивидуальный подход. 8 фото.",
                images: generateImagePaths("designer/1room", 8)
            },
            designer_2room: {
                title: "2-комнатная квартира - Дизайнерский ремонт",
                description: "65 м². Уникальный дизайн и премиальные материалы. 11 фото.",
                images: generateImagePaths("designer/2room", 11)
            },
            designer_3room: {
                title: "3-комнатная квартира - Дизайнерский ремонт",
                description: "90 м². Эксклюзивный проект с авторским надзором. 14 фото.",
                images: generateImagePaths("designer/3room", 14)
            },

            // РЕМОНТ КОТТЕДЖЕЙ
            cott_140: {
                title: "Загородный коттедж - 140 м²",
                description: "Коттеджный поселок, 140 м². Просторный и комфортный дом за городом. 6 фото.",
                images: generateImagePaths("cott/140", 6)
            },
            cott_289: {
                title: "Загородный коттедж - 289 м²",
                description: "Элитный поселок, 289 м². Роскошный коттедж с индивидуальным дизайном. 7 фото.",
                images: generateImagePaths("cott/289", 7)
            }
        };

        // Helper function for generating image paths
        function generateImagePaths(folder, count) {
            const images = [];
            for (let i = 1; i <= count; i++) {
                // Определяем проекты, которые используют PNG
                const pngProjects = ['1room_37', '2room_42', '3room_56', 'office1'];
                const isPngProject = pngProjects.some(project => folder.includes(project));
                
                if (isPngProject) {
                    images.push(`images/portfolio/${folder}/${i}.png`);
                } else {
                    images.push(`images/portfolio/${folder}/${i}.jpg`);
                }
            }
            return images;
        }

        // Event handlers for gallery buttons
        document.querySelectorAll('.view-gallery-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const projectId = this.getAttribute('data-project');
                console.log('Opening gallery for:', projectId);
                openGallery(projectId);
            });
        });

        // Open gallery
        function openGallery(projectId) {
            if (!projectsData[projectId]) {
                console.error('Project not found:', projectId);
                return;
            }
            
            currentProject = projectsData[projectId];
            currentImageIndex = 0;
            
            if (galleryTitle) galleryTitle.textContent = currentProject.title;
            if (galleryDescription) galleryDescription.textContent = currentProject.description;
            
            updateGallery();
            galleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }

        // Update gallery
        function updateGallery() {
            if (!currentProject || !galleryMainImage) return;
            
            galleryMainImage.src = currentProject.images[currentImageIndex];
            
            // Update thumbnails
            if (galleryThumbs) {
                galleryThumbs.innerHTML = '';
                currentProject.images.forEach((image, index) => {
                    const thumb = document.createElement('div');
                    thumb.className = `gallery-thumb ${index === currentImageIndex ? 'active' : ''}`;
                    thumb.style.backgroundImage = `url(${image})`;
                    thumb.addEventListener('click', () => {
                        currentImageIndex = index;
                        updateGallery();
                    });
                    galleryThumbs.appendChild(thumb);
                });
            }
        }

        // Gallery navigation
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (!currentProject) return;
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProject.images.length - 1;
                updateGallery();
            });
        }
        
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                if (!currentProject) return;
                currentImageIndex = currentImageIndex < currentProject.images.length - 1 ? currentImageIndex + 1 : 0;
                updateGallery();
            });
        }

        // Close gallery
        if (closeGallery) {
            closeGallery.addEventListener('click', closeGalleryModal);
        }

        function closeGalleryModal() {
            galleryModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }

        // Close gallery when clicking outside the modal content
        window.addEventListener('click', (e) => {
            if (e.target === galleryModal) {
                closeGalleryModal();
            }
        });

        // Close gallery on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && galleryModal.style.display === 'block') {
                closeGalleryModal();
            }
            if (e.key === 'ArrowLeft' && galleryModal.style.display === 'block') {
                if (!currentProject) return;
                currentImageIndex = currentImageIndex > 0 ? currentImageIndex - 1 : currentProject.images.length - 1;
                updateGallery();
            }
            if (e.key === 'ArrowRight' && galleryModal.style.display === 'block') {
                if (!currentProject) return;
                currentImageIndex = currentImageIndex < currentProject.images.length - 1 ? currentImageIndex + 1 : 0;
                updateGallery();
            }
        });
    }

    // Animation on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.service-card, .advantage-card, .portfolio-item, .process-step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll('.service-card, .advantage-card, .portfolio-item, .process-step');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Check animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});