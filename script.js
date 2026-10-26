/**
 * Global Enterprises - Industrial Core Box & Exploration Drilling Solutions
 * Core Interactive Logic & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // -------------------------------------------------------------------------
  // 1. Navigation & Header Scroll Behavior
  // -------------------------------------------------------------------------
  const mainHeader = document.getElementById('mainHeader');
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const drawerClose = document.getElementById('drawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const desktopNavLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  // Sticky header background transition
  const handleScroll = () => {
    const scrollY = window.scrollY || window.pageYOffset;
    if (mainHeader) {
      if (scrollY > 50) {
        mainHeader.classList.add('scrolled');
      } else {
        mainHeader.classList.remove('scrolled');
      }
    }

    // Scroll to top button visibility (safe check)
    if (scrollTopBtn) {
      if (scrollY > 400) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Scroll to top action
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile Drawer Toggle
  const openMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.add('active');
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeMobileMenu = () => {
    if (mobileDrawer) mobileDrawer.classList.remove('active');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobileToggle) mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  if (mobileToggle) mobileToggle.addEventListener('click', openMobileMenu);
  if (drawerClose) drawerClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // Active Navigation link on scroll (IntersectionObserver)
  const sections = document.querySelectorAll('section[id], header[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        desktopNavLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => sectionObserver.observe(sec));

  // -------------------------------------------------------------------------
  // 2. Interactive Core Box Requirement Calculator
  // -------------------------------------------------------------------------
  const drillModelSelect = document.getElementById('drillModelSelect');
  const trayMaterialSelect = document.getElementById('trayMaterialSelect');
  const metersDrilledInput = document.getElementById('metersDrilledInput');
  const metersValueDisplay = document.getElementById('metersValueDisplay');
  const calcTraysCount = document.getElementById('calcTraysCount');
  const calcTotalWeight = document.getElementById('calcTotalWeight');
  const calcLidsCount = document.getElementById('calcLidsCount');
  const applyCalcToQuoteBtn = document.getElementById('applyCalcToQuoteBtn');

  const updateCalculations = () => {
    if (!drillModelSelect || !metersDrilledInput || !metersValueDisplay) return;

    const meters = parseInt(metersDrilledInput.value, 10);
    metersValueDisplay.textContent = `${meters} m`;

    const selectedOption = drillModelSelect.options && drillModelSelect.options[drillModelSelect.selectedIndex];
    if (!selectedOption) return;

    const capacityPerTray = parseFloat(selectedOption.getAttribute('data-capacity')) || 5;
    const isPlastic = trayMaterialSelect && trayMaterialSelect.value === 'plastic';

    // Unit weight
    const metalWeight = parseFloat(selectedOption.getAttribute('data-weight')) || 5.5;
    const plasticWeight = parseFloat(selectedOption.getAttribute('data-plastic-weight')) || 2.4;
    const unitWeight = isPlastic ? plasticWeight : metalWeight;

    // Calculate Trays
    const traysNeeded = Math.ceil(meters / capacityPerTray);
    const totalTareWeight = (traysNeeded * unitWeight).toFixed(1);

    if (calcTraysCount) calcTraysCount.textContent = traysNeeded.toLocaleString('en-IN');
    if (calcTotalWeight) calcTotalWeight.textContent = `${parseFloat(totalTareWeight).toLocaleString('en-IN')} kg`;
    if (calcLidsCount) calcLidsCount.textContent = traysNeeded.toLocaleString('en-IN');
  };

  if (drillModelSelect) drillModelSelect.addEventListener('change', updateCalculations);
  if (trayMaterialSelect) trayMaterialSelect.addEventListener('change', updateCalculations);
  if (metersDrilledInput) metersDrilledInput.addEventListener('input', updateCalculations);

  updateCalculations();

  // Transfer Calculated Values to RFQ Form
  if (applyCalcToQuoteBtn) {
    applyCalcToQuoteBtn.addEventListener('click', () => {
      const meters = metersDrilledInput.value;
      const model = drillModelSelect.value;
      const material = trayMaterialSelect.value === 'plastic' ? 'Plastic' : 'Galvanized Steel';
      const trays = calcTraysCount.textContent;
      const weight = calcTotalWeight.textContent;

      // Fill in contact form fields
      const productSelect = document.getElementById('productSelect');
      const quantityInput = document.getElementById('quantity');
      const messageInput = document.getElementById('message');

      if (productSelect) {
        // Attempt to match model option respecting material
        const isPlastic = trayMaterialSelect && trayMaterialSelect.value === 'plastic';
        let matched = false;

        for (let i = 0; i < productSelect.options.length; i++) {
          const val = productSelect.options[i].value;
          if (isPlastic) {
            if (val.toLowerCase().includes('plastic') && (val.includes(model) || val.includes('Plastic Core Boxes'))) {
              productSelect.selectedIndex = i;
              matched = true;
              break;
            }
          } else {
            if (!val.toLowerCase().includes('plastic') && val.includes(model)) {
              productSelect.selectedIndex = i;
              matched = true;
              break;
            }
          }
        }

        if (!matched) {
          for (let i = 0; i < productSelect.options.length; i++) {
            const val = productSelect.options[i].value;
            if (isPlastic && val.toLowerCase().includes('plastic')) {
              productSelect.selectedIndex = i;
              break;
            } else if (!isPlastic && val.includes(model)) {
              productSelect.selectedIndex = i;
              break;
            }
          }
        }
      }

      if (quantityInput) {
        quantityInput.value = trays.replace(/,/g, '');
      }

      if (messageInput) {
        messageInput.value = `[Calculator Estimate]: Requesting quote for ${trays} ${material} Core Trays (${model} Model) to cover ${meters}m of drilling (approx tare weight ${weight}). Please include delivery charges to our warehouse.`;
      }

      // Smooth scroll to contact section
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
        // Flash subtle focus effect on form
        const formPanel = document.querySelector('.contact-form-panel');
        if (formPanel) {
          formPanel.style.outline = '2px solid #f15a24';
          setTimeout(() => { formPanel.style.outline = 'none'; }, 2000);
        }
      }
    });
  }

  // Quick Quote Buttons from product cards
  const quickQuoteButtons = document.querySelectorAll('.quick-quote-btn, .product-action-row .btn-primary');
  quickQuoteButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const model = btn.getAttribute('data-model');
      if (model) {
        const productSelect = document.getElementById('productSelect');
        const messageInput = document.getElementById('message');
        if (productSelect) {
          for (let i = 0; i < productSelect.options.length; i++) {
            if (productSelect.options[i].value.includes(model) || model.includes(productSelect.options[i].value.split(' ')[0])) {
              productSelect.selectedIndex = i;
              break;
            }
          }
        }
        if (messageInput) {
          messageInput.value = `Hello Global Enterprises, I am inquiring about pricing and dispatch timelines for ${model}.`;
        }
      }
    });
  });


  // -------------------------------------------------------------------------
  // 3. Gallery Filter Chips
  // -------------------------------------------------------------------------
  const filterChips = document.querySelectorAll('.filter-chip');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const filter = chip.getAttribute('data-filter');

      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.95)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });

  // -------------------------------------------------------------------------
  // 4. Fullscreen Lightbox Modal
  // -------------------------------------------------------------------------
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');

  let currentGalleryList = [];
  let currentLightboxIndex = 0;

  const gatherTriggers = (clickedElement) => {
    if (clickedElement) {
      // If image is inside a product-slider, scope only to that slider's slides
      const slider = clickedElement.closest('.product-slider');
      if (slider) {
        return Array.from(slider.querySelectorAll('.slider-slide img.lightbox-trigger, .slider-slide img'));
      }
      // If clicked inside a specific gallery section, scope to visible items
      const gallery = clickedElement.closest('.masonry-gallery, .showcase-dual-grid');
      if (gallery) {
        return Array.from(gallery.querySelectorAll('.lightbox-trigger, .gallery-card img')).filter(el => {
          const card = el.closest('.gallery-card');
          if (card && (card.style.display === 'none' || getComputedStyle(card).display === 'none')) {
            return false;
          }
          return el.offsetParent !== null;
        });
      }
    }
    // General fallback: only include visible elements
    return Array.from(document.querySelectorAll('.lightbox-trigger, .gallery-card img')).filter(el => {
      const card = el.closest('.gallery-card');
      if (card && (card.style.display === 'none' || getComputedStyle(card).display === 'none')) {
        return false;
      }
      return el.offsetParent !== null;
    });
  };

  const openLightbox = (imgElement) => {
    if (!lightboxModal || !imgElement) return;
    currentGalleryList = gatherTriggers(imgElement);
    currentLightboxIndex = currentGalleryList.indexOf(imgElement);

    if (currentLightboxIndex === -1) {
      currentGalleryList = [imgElement];
      currentLightboxIndex = 0;
    }

    updateLightboxContent();
    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const updateLightboxContent = () => {
    if (!lightboxImg || !lightboxCaption) return;
    const activeItem = currentGalleryList[currentLightboxIndex];
    if (!activeItem) return;

    lightboxImg.src = activeItem.src || activeItem.getAttribute('src');
    const title = activeItem.getAttribute('data-title') || activeItem.getAttribute('alt') || 'Global Enterprises';
    lightboxCaption.textContent = title;
  };

  const closeLightbox = () => {
    if (!lightboxModal) return;
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const nextLightboxImage = () => {
    if (currentGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentGalleryList.length;
    updateLightboxContent();
  };

  const prevLightboxImage = () => {
    if (currentGalleryList.length === 0) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentGalleryList.length) % currentGalleryList.length;
    updateLightboxContent();
  };

  // Attach click listeners to all lightbox triggers
  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('.lightbox-trigger, .gallery-card');
    if (trigger) {
      const img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
      if (img) openLightbox(img);
    }
  });

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxNext) lightboxNext.addEventListener('click', nextLightboxImage);
  if (lightboxPrev) lightboxPrev.addEventListener('click', prevLightboxImage);

  // Keyboard navigation for Lightbox (with defensive guard)
  window.addEventListener('keydown', (e) => {
    if (!lightboxModal || !lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextLightboxImage();
    if (e.key === 'ArrowLeft') prevLightboxImage();
  });

  // -------------------------------------------------------------------------
  // 5. Live Video Modal & 360 NQ Video Handler
  // -------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoBackdrop = document.getElementById('videoBackdrop');
  const videoClose = document.getElementById('videoClose');
  const liveVideoPlayer = document.getElementById('liveVideoPlayer');

  const openVideoModal = (videoSrc) => {
    if (!videoModal) return;
    if (liveVideoPlayer && videoSrc && typeof videoSrc === 'string') {
      const sourceEl = liveVideoPlayer.querySelector('source');
      if (sourceEl && sourceEl.src !== videoSrc) {
        sourceEl.src = videoSrc;
        liveVideoPlayer.load();
      }
    }
    videoModal.classList.add('active');
    videoModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    if (liveVideoPlayer) {
      liveVideoPlayer.currentTime = 0;
      liveVideoPlayer.play().catch(() => {});
    }
  };

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('active');
    videoModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (liveVideoPlayer) {
      liveVideoPlayer.pause();
    }
  };

  // Bind all video trigger buttons
  document.querySelectorAll('#openVideoBtn, #videoBannerTrigger, #openNqVideoBtn, #spotlightVideoBtn, .js-open-video, [data-open-video="true"]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const customSrc = btn.getAttribute('data-video-src');
      openVideoModal(customSrc);
    });
  });

  if (videoClose) videoClose.addEventListener('click', closeVideoModal);
  if (videoBackdrop) videoBackdrop.addEventListener('click', closeVideoModal);

  window.addEventListener('keydown', (e) => {
    if (videoModal && videoModal.classList.contains('active') && e.key === 'Escape') {
      closeVideoModal();
    }
  });

  // -------------------------------------------------------------------------
  // 5b. NQ Best Seller Media Switcher (Photo Slider vs 360 Video)
  // -------------------------------------------------------------------------
  const initNqMediaSwitcher = () => {
    const switcher = document.querySelector('.media-switcher-tabs');
    const photoSlider = document.getElementById('nqPhotoSlider');
    const videoContainer = document.getElementById('nqVideoContainer');
    const inlineVideo = document.getElementById('nqInlineVideo');
    if (!switcher || !photoSlider || !videoContainer) return;

    const tabBtns = switcher.querySelectorAll('.media-tab-btn');

    const switchView = (targetView) => {
      tabBtns.forEach(btn => {
        if (btn.getAttribute('data-target') === targetView) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });

      if (targetView === 'video') {
        photoSlider.style.display = 'none';
        videoContainer.classList.add('active');
        videoContainer.style.display = 'block';
        if (inlineVideo) {
          inlineVideo.play().catch(() => {});
        }
      } else {
        videoContainer.classList.remove('active');
        videoContainer.style.display = 'none';
        photoSlider.style.display = 'block';
        if (inlineVideo) {
          inlineVideo.pause();
        }
      }
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetView = btn.getAttribute('data-target');
        switchView(targetView);
      });
    });

    // Also support video thumbnail click in slider to jump directly to 360 video view
    const videoThumb = document.querySelector('.thumb-btn.video-thumb-btn');
    if (videoThumb) {
      videoThumb.addEventListener('click', (e) => {
        e.preventDefault();
        switchView('video');
      });
    }
  };

  initNqMediaSwitcher();

  // -------------------------------------------------------------------------
  // 6. Contact / RFQ Form - Direct WhatsApp Auto-Fill Action
  // -------------------------------------------------------------------------
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccess = document.getElementById('formSuccess');
  const formError = document.getElementById('formError');

  const sendWhatsAppQuotation = (e) => {
    if (e) e.preventDefault();

    const firstName = contactForm ? contactForm.querySelector('#firstName') : document.getElementById('firstName');
    const lastName = contactForm ? contactForm.querySelector('#lastName') : document.getElementById('lastName');
    const email = contactForm ? contactForm.querySelector('#email') : document.getElementById('email');
    const phone = contactForm ? contactForm.querySelector('#phone') : document.getElementById('phone');
    const productSelect = contactForm ? contactForm.querySelector('#productSelect') : document.getElementById('productSelect');
    const quantity = contactForm ? contactForm.querySelector('#quantity') : document.getElementById('quantity');
    const message = contactForm ? contactForm.querySelector('#message') : document.getElementById('message');

    // Extract values with graceful fallbacks
    const fName = (firstName && firstName.value.trim()) || '';
    const lName = (lastName && lastName.value.trim()) || '';
    const clientName = (fName || lName) ? `${fName} ${lName}`.trim() : 'Prospective Client';
    const clientEmail = (email && email.value.trim()) || 'Not provided';
    const clientPhone = (phone && phone.value.trim()) || 'Not provided';
    const selectedProduct = (productSelect && productSelect.value) || 'GI Core Box NQ (5 Row) - Standard';
    const orderQty = (quantity && quantity.value.trim()) || '100';
    const clientMsg = (message && message.value.trim()) || 'Please provide quotation, dimensional drawings, and dispatch schedule to our project site.';

    // Construct cleanly formatted WhatsApp message
    const waText = 
`Hello Global Enterprises,

I am requesting an official quotation with the following project details:

📋 *QUOTATION REQUEST DETAILS*
----------------------------------------
👤 *Name:* ${clientName}
📧 *Email:* ${clientEmail}
📞 *Phone / WhatsApp:* ${clientPhone}
📦 *Product Model:* ${selectedProduct}
🔢 *Estimated Quantity:* ${orderQty} Units

📝 *Requirements / Message:*
${clientMsg}
----------------------------------------
_Inquiry sent via globalcorebox.in_`;

    const whatsappNumber = '919521159531';
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(waText)}`;

    // Helper to safely escape HTML special characters and prevent DOM XSS
    const escapeHTML = (str) => {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    };

    const safeProduct = escapeHTML(selectedProduct);
    const safeQty = escapeHTML(orderQty);

    // Show success alert on page with sanitized values
    if (formSuccess) {
      formSuccess.innerHTML = `
        <svg viewBox="0 0 20 20" width="24" height="24" fill="#10b981" style="flex-shrink:0;">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
        </svg>
        <div style="flex:1;">
          <strong style="color:#065f46; font-size:1.05rem; display:block; margin-bottom:0.25rem;">WhatsApp Chat Opened!</strong>
          <span style="color:#047857; font-size:0.9rem;">Your quotation details for <strong>${safeProduct} (${safeQty} Units)</strong> have been auto-filled in WhatsApp.</span>
          <div style="margin-top:0.75rem;">
            <a href="${whatsappUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-sm" style="background:#25d366; color:#ffffff; font-weight:700; text-transform:none; border-radius:9999px; display:inline-flex; align-items:center; gap:0.5rem; padding:0.5rem 1.25rem; box-shadow:0 3px 10px rgba(37,211,102,0.4);">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.42 0-2.82-.37-4.06-1.07l-.29-.17-3.11.82.83-3.03-.19-.3a8.19 8.19 0 01-1.26-4.48c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.07-.25-.12-1.05-.39-2-1.23-.74-.66-1.24-1.47-1.39-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.44 1.02 2.6c.12.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.44.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.12-.23-.19-.48-.31z"/></svg>
              Reopen WhatsApp Chat
            </a>
          </div>
        </div>
      `;
      formSuccess.classList.add('visible');
    }

    if (formError) {
      formError.classList.remove('visible');
    }

    // Open WhatsApp SYNCHRONOUSLY directly from the user's click gesture with secure noopener,noreferrer
    const newWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
      // In case browser policy forces strict same-tab redirect
      window.location.href = whatsappUrl;
    }
  };

  if (contactForm) {
    contactForm.addEventListener('submit', sendWhatsAppQuotation);
  }

  if (submitBtn) {
    submitBtn.addEventListener('click', (e) => {
      // If inside a form, submit will handle it, but clicking directly also ensures execution
      if (!contactForm) {
        sendWhatsAppQuotation(e);
      }
    });
  }
  // -------------------------------------------------------------------------
  // 7. Product Card Image Sliders (Multi-Photo Slide System)
  // -------------------------------------------------------------------------
  const initProductSliders = () => {
    const sliders = document.querySelectorAll('.product-slider');
    sliders.forEach(slider => {
      const track = slider.querySelector('.slider-slides-track');
      const slides = slider.querySelectorAll('.slider-slide');
      if (!track || slides.length === 0) return;

      const prevBtn = slider.querySelector('.slider-btn.prev');
      const nextBtn = slider.querySelector('.slider-btn.next');
      const dots = slider.querySelectorAll('.slider-dots .dot');
      const thumbs = slider.querySelectorAll('.slider-thumbnails .thumb-btn');
      const counterCurrent = slider.querySelector('.current-slide-num');
      const counterTotal = slider.querySelector('.total-slides-num');

      let currentIndex = 0;
      const totalSlides = slides.length;

      if (counterTotal) {
        counterTotal.textContent = totalSlides;
      }

      const goToSlide = (targetIndex) => {
        if (targetIndex < 0) {
          currentIndex = totalSlides - 1;
        } else if (targetIndex >= totalSlides) {
          currentIndex = 0;
        } else {
          currentIndex = targetIndex;
        }

        // Slide the track
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Update active class on slides
        slides.forEach((slide, idx) => {
          if (idx === currentIndex) {
            slide.classList.add('active');
          } else {
            slide.classList.remove('active');
          }
        });

        // Update active class on dots
        dots.forEach((dot, idx) => {
          if (idx === currentIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });

        // Update active class on thumbnail buttons
        thumbs.forEach((thumb, idx) => {
          if (idx === currentIndex) {
            thumb.classList.add('active');
          } else {
            thumb.classList.remove('active');
          }
        });

        // Update counter number
        if (counterCurrent) {
          counterCurrent.textContent = currentIndex + 1;
        }
      };

      // Event delegation on slider container for maximum click reliability
      slider.addEventListener('click', (e) => {
        const prev = e.target.closest('.slider-btn.prev');
        if (prev) {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex - 1);
          return;
        }

        const next = e.target.closest('.slider-btn.next');
        if (next) {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex + 1);
          return;
        }

        const dot = e.target.closest('.slider-dots .dot');
        if (dot) {
          e.preventDefault();
          e.stopPropagation();
          const dotIdx = Array.from(dots).indexOf(dot);
          if (dotIdx !== -1) goToSlide(dotIdx);
          return;
        }

        const thumb = e.target.closest('.slider-thumbnails .thumb-btn');
        if (thumb) {
          e.preventDefault();
          e.stopPropagation();
          const thumbIdx = Array.from(thumbs).indexOf(thumb);
          if (thumbIdx !== -1) goToSlide(thumbIdx);
          return;
        }
      });

      // Direct button listeners as secondary assurance
      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(currentIndex + 1);
        });
      }

      // Dot listeners
      dots.forEach((dot, idx) => {
        dot.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(idx);
        });
      });

      // Thumbnail listeners
      thumbs.forEach((thumb, idx) => {
        thumb.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          goToSlide(idx);
        });
      });

      // Touch / Swipe support for mobile & tablet
      let touchStartX = 0;
      let touchStartY = 0;
      let isSwiping = false;

      slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
      }, { passive: true });

      slider.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;

        // Ensure horizontal swipe is dominant and exceeds threshold
        if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
          if (diffX < 0) {
            goToSlide(currentIndex + 1); // Swipe left -> next
          } else {
            goToSlide(currentIndex - 1); // Swipe right -> prev
          }
        }
      }, { passive: true });

      // Initialize initial state
      goToSlide(0);
    });
  };

  initProductSliders();

  // -------------------------------------------------------------------------
  // 8. Mobile / Touch dropdown toggle for navigation
  // -------------------------------------------------------------------------
  const dropdownToggle = document.querySelector('.dropdown-toggle');
  const dropdownMenu = document.querySelector('.nav-dropdown-menu');
  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (e) => {
      // On touch devices where desktop nav is visible, tap toggles dropdown
      const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      if (isTouch && window.innerWidth > 1080) {
        if (!dropdownMenu.classList.contains('touch-open')) {
          e.preventDefault();
          dropdownMenu.classList.add('touch-open');
        }
      }
    });

    document.addEventListener('click', (e) => {
      if (!dropdownToggle.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.remove('touch-open');
      }
    });
  }

  // -------------------------------------------------------------------------
  // 9. Clean URL Routing & Slugs (gi-core-boxes, plastic-core-boxes, clientele)
  // -------------------------------------------------------------------------
  const applyCleanUrls = () => {
    try {
      const p = window.location.pathname;
      const search = window.location.search || '';
      const hash = window.location.hash || '';

      if (p.endsWith('gi-core-boxes.html')) {
        const cleanPath = p.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + search + hash);
      } else if (p.endsWith('plastic-core-boxes.html')) {
        const cleanPath = p.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + search + hash);
      } else if (p.endsWith('trunks.html')) {
        const cleanPath = p.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + search + hash);
      } else if (p.endsWith('clientele.html')) {
        const cleanPath = p.replace(/\.html$/, '');
        window.history.replaceState(null, '', cleanPath + search + hash);
      }
    } catch (e) {
      // Gracefully ignored if history.replaceState is restricted in certain sandboxed environments
    }
  };

  applyCleanUrls();

  window.addEventListener('hashchange', applyCleanUrls);
  window.addEventListener('popstate', applyCleanUrls);

  // Local file:/// protocol click fallback so direct filesystem opening works seamlessly
  if (window.location.protocol === 'file:') {
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;
      if (href === '/' || href.startsWith('/#')) {
        e.preventDefault();
        window.location.href = 'index.html' + (href.indexOf('#') !== -1 ? '#' + href.split('#')[1] : '');
      } else if (href === 'gi-core-boxes' || href.startsWith('gi-core-boxes#')) {
        e.preventDefault();
        window.location.href = href.replace(/^gi-core-boxes/, 'gi-core-boxes.html');
      } else if (href === 'plastic-core-boxes' || href.startsWith('plastic-core-boxes#')) {
        e.preventDefault();
        window.location.href = href.replace(/^plastic-core-boxes/, 'plastic-core-boxes.html');
      } else if (href === 'trunks' || href.startsWith('trunks#')) {
        e.preventDefault();
        window.location.href = href.replace(/^trunks/, 'trunks.html');
      } else if (href === 'clientele' || href.startsWith('clientele#')) {
        e.preventDefault();
        window.location.href = href.replace(/^clientele/, 'clientele.html');
      }
    });
  }
});


