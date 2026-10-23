/**
 * MosGrid Technologies Platform Engine
 * Headquartered in Visakhapatnam, Andhra Pradesh, India
 * Native File Attachment Delivery & Inquiries Pipeline
 */

let isCandidateSubmitting = false;
let isContactSubmitting = false;

document.addEventListener('DOMContentLoaded', () => {
  initAmbientCursorAura();
  initCircuitCanvas();
  initSilicon3DTilt();
  initSpotlightHover();
  initAnimatedCounters();
  initJobFilters();
  initTerminalSimulation();
  initNavbarScroll();
  initMobileMenu();
  initResumeUpload();
  initIframesListeners();
});

/* ==========================================================================
   1. Smooth Ambient Electron Aura (Glides under the native SVG pointer)
   ========================================================================== */
function initAmbientCursorAura() {
  const aura = document.getElementById('cursorAura');
  if (!aura) return;

  if (window.matchMedia('(hover: none) and (pointer: coarse)').matches) {
    aura.style.display = 'none';
    return;
  }

  let mouseX = -100, mouseY = -100;
  let auraX = -100, auraY = -100;
  let isVisible = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    if (!isVisible) {
      aura.style.opacity = '1';
      isVisible = true;
    }
  });

  document.addEventListener('mouseleave', () => {
    aura.style.opacity = '0';
    isVisible = false;
  });

  document.addEventListener('mouseenter', () => {
    aura.style.opacity = '1';
    isVisible = true;
  });

  function renderAura() {
    auraX += (mouseX - auraX) * 0.16;
    auraY += (mouseY - auraY) * 0.16;

    aura.style.left = `${auraX}px`;
    aura.style.top = `${auraY}px`;

    requestAnimationFrame(renderAura);
  }
  requestAnimationFrame(renderAura);

  const interactiveSelector = 'a, button, select, input[type="checkbox"], .spotlight-card, .filter-btn, .file-remove-btn, .upload-dropzone, .btn, .social-chip';
  
  function attachHoverListeners() {
    const targets = document.querySelectorAll(interactiveSelector);
    targets.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        aura.classList.add('aura-hover');
      });
      el.addEventListener('mouseleave', () => {
        aura.classList.remove('aura-hover');
      });
    });
  }
  attachHoverListeners();

  window.addEventListener('click', (e) => {
    const pulse = document.createElement('div');
    pulse.className = 'cursor-pulse';
    pulse.style.left = `${e.clientX}px`;
    pulse.style.top = `${e.clientY}px`;
    document.body.appendChild(pulse);

    setTimeout(() => {
      pulse.remove();
    }, 550);
  });
}

/* ==========================================================================
   2. Interactive 2D Silicon Circuit Canvas (Ortho Manhattan Traces)
   ========================================================================== */
function initCircuitCanvas() {
  const canvas = document.getElementById('circuit-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let lines = [];
  const gridSize = 45;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    generateCircuitLines();
  }

  window.addEventListener('resize', resize);

  function generateCircuitLines() {
    lines = [];
    const count = Math.floor((width * height) / 25000);

    for (let i = 0; i < count; i++) {
      let x = Math.floor((Math.random() * width) / gridSize) * gridSize;
      let y = Math.floor((Math.random() * height) / gridSize) * gridSize;
      let length = (Math.floor(Math.random() * 4) + 3) * gridSize;
      let horizontal = Math.random() > 0.5;

      lines.push({
        x,
        y,
        len: length,
        horizontal: horizontal,
        progress: Math.random(),
        speed: 0.003 + Math.random() * 0.005,
        color: Math.random() > 0.3 ? '#00f0ff' : '#0070f3'
      });
    }
  }

  resize();

  function animate() {
    ctx.clearRect(0, 0, width, height);

    lines.forEach(line => {
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.05)';
      ctx.lineWidth = 1;

      let xEnd = line.horizontal ? line.x + line.len : line.x;
      let yEnd = line.horizontal ? line.y : line.y + line.len;

      ctx.moveTo(line.x, line.y);
      ctx.lineTo(xEnd, yEnd);
      ctx.stroke();

      line.progress += line.speed;
      if (line.progress > 1) line.progress = 0;

      let pulseX = line.horizontal ? line.x + line.len * line.progress : line.x;
      let pulseY = line.horizontal ? line.y : line.y + line.len * line.progress;

      ctx.beginPath();
      ctx.arc(pulseX, pulseY, 2, 0, Math.PI * 2);
      ctx.fillStyle = line.color;
      ctx.shadowColor = line.color;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. 3D Gyroscopic Silicon Die Tilt Effect
   ========================================================================== */
function initSilicon3DTilt() {
  const stage = document.getElementById('siliconStage');
  const die = document.getElementById('siliconDie');
  if (!stage || !die) return;

  stage.addEventListener('mousemove', (e) => {
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotX = -(y / (rect.height / 2)) * 18;
    const rotY = (x / (rect.width / 2)) * 18;

    die.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03, 1.03, 1.03)`;
  });

  stage.addEventListener('mouseleave', () => {
    die.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
  });
}

/* ==========================================================================
   4. Spotlight Card Cursor Physics (--mouse-x, --mouse-y)
   ========================================================================== */
function initSpotlightHover() {
  const cards = document.querySelectorAll('.spotlight-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/* ==========================================================================
   5. High-Tech Animated Number Counters
   ========================================================================== */
function initAnimatedCounters() {
  const metricNumbers = document.querySelectorAll('.metric-number');
  if (!metricNumbers.length) return;
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        metricNumbers.forEach(num => {
          const target = parseFloat(num.getAttribute('data-target'));
          if (isNaN(target)) return;
          const isDecimal = target % 1 !== 0;
          let current = 0;
          const step = target / 60;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              num.innerText = isDecimal ? target.toFixed(1) : Math.floor(target);
              clearInterval(timer);
            } else {
              num.innerText = isDecimal ? current.toFixed(1) : Math.floor(current);
            }
          }, 25);
        });
      }
    });
  }, { threshold: 0.6 });

  metricNumbers.forEach(n => observer.observe(n));
}

/* ==========================================================================
   6. Filterable Domestic Tech Hubs & Roles
   ========================================================================== */
function initJobFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  const jobs = document.querySelectorAll('.job-row');
  if (!buttons.length || !jobs.length) return;

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = (btn.getAttribute('data-filter') || 'all').toLowerCase().trim();

      jobs.forEach(job => {
        const categoryAttr = (job.getAttribute('data-category') || '').toLowerCase();
        const categories = categoryAttr.split(/\s+/);

        if (filter === 'all' || categories.includes(filter) || categoryAttr.includes(filter)) {
          job.style.display = 'flex';
        } else {
          job.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   7. Live EDA Synthesis Terminal Log Simulation (Safely runs if unhidden)
   ========================================================================== */
function initTerminalSimulation() {
  const screen = document.getElementById('terminalScreen');
  const replayBtn = document.getElementById('replayBtn');
  if (!screen) return;

  const logs = [
    { text: '[MOSGRID-VIZAG-EDA] Initializing OpenLane Physical Synthesis Pipeline...', class: 'log-cyan' },
    { text: 'Loading Design PDK: FinFET sub-3nm Technology Node...', class: 'log-muted' },
    { text: 'Reading gate-level netlist: mosgrid_soc_top.v [2,450,000 gates]', class: 'log-purple' },
    { text: 'Executing Static Timing Analysis (STA) on Worst PVT Corners...', class: 'log-muted' },
    { text: 'Clock Tree Synthesis (CTS): Skew minimized to 4.2ps across domains', class: 'log-cyan' },
    { text: 'Timing Signoff Slack: WNS = +0.028ns, TNS = 0.000ns [SLACK MET]', class: 'log-green' },
    { text: 'DRC & LVS Signoff: 0 Violations detected. Clean tape-out.', class: 'log-green' },
    { text: '>> GDSII STREAM READY: Authorized for Wafer Fab Delivery <<', class: 'log-cyan' }
  ];

  function runSimulation() {
    screen.innerHTML = '';
    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        const p = document.createElement('div');
        p.className = `log-line ${logs[i].class}`;
        p.innerHTML = `<span style="opacity:0.5;">$</span> ${logs[i].text}`;
        screen.appendChild(p);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 400);
  }

  runSimulation();
  replayBtn?.addEventListener('click', runSimulation);
}

/* ==========================================================================
   8. Navigation Bar Scroll State & Mobile Drawer Toggle
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  hamburger?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });

  navMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });
}

/* ==========================================================================
   9. Resume File Upload & 10MB Validation Handling
   ========================================================================== */
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB limit

function initResumeUpload() {
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('resumeFile');
  const dropContent = document.getElementById('dropzoneContent');
  const filePreview = document.getElementById('filePreview');
  const fileNameText = document.getElementById('fileNameText');
  const fileSizeText = document.getElementById('fileSizeText');
  const fileTypeIcon = document.getElementById('fileTypeIcon');
  const removeBtn = document.getElementById('fileRemoveBtn');
  const errorMsg = document.getElementById('fileErrorMsg');

  if (!dropzone || !fileInput) return;

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      fileInput.files = e.dataTransfer.files;
      validateAndDisplayFile(fileInput.files[0]);
    }
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files && fileInput.files.length > 0) {
      validateAndDisplayFile(fileInput.files[0]);
    }
  });

  removeBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    resetFileUpload();
  });

  function validateAndDisplayFile(file) {
    if (!errorMsg) return;
    errorMsg.innerText = '';
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedExtensions.includes(fileExt)) {
      errorMsg.innerText = '❌ Invalid format: Only PDF or Word documents (.pdf, .doc, .docx) are accepted.';
      resetFileUpload();
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
      errorMsg.innerText = `❌ File size (${sizeMB} MB) exceeds the 10 MB limit. Please upload a smaller file.`;
      resetFileUpload();
      return;
    }

    if (fileNameText) fileNameText.innerText = file.name;
    if (fileSizeText) fileSizeText.innerText = (file.size / (1024 * 1024)).toFixed(2) + ' MB';
    
    if (fileTypeIcon) {
      if (fileExt === 'pdf') {
        fileTypeIcon.className = 'fa-solid fa-file-pdf file-type-icon text-cyan';
      } else {
        fileTypeIcon.className = 'fa-solid fa-file-word file-type-icon text-green';
      }
    }

    if (dropContent) dropContent.style.display = 'none';
    if (filePreview) filePreview.style.display = 'flex';
  }

  function resetFileUpload() {
    fileInput.value = '';
    if (dropContent) dropContent.style.display = 'flex';
    if (filePreview) filePreview.style.display = 'none';
  }
}

/* ==========================================================================
   10. Candidate Portal Form Submission
   ========================================================================== */
function handleCandidateSubmit(e) {
  const fileInput = document.getElementById('resumeFile');
  const errorMsg = document.getElementById('fileErrorMsg');
  const btn = document.getElementById('submitBtn');
  const candNameInput = document.getElementById('candName');
  const candName = candNameInput ? candNameInput.value.trim() : 'Candidate';

  if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
    if (errorMsg) errorMsg.innerText = '❌ Please upload your resume in PDF or Word format (max 10MB).';
    fileInput?.focus();
    return false;
  }

  const file = fileInput.files[0];
  if (file.size > MAX_FILE_SIZE) {
    if (errorMsg) errorMsg.innerText = '❌ File size exceeds 10MB limit. Please compress or choose a smaller file.';
    return false;
  }

  const selectedFocus = [];
  document.querySelectorAll('input[name="focus_cb"]:checked').forEach(cb => {
    selectedFocus.push(cb.value);
  });
  const hiddenDomains = document.getElementById('hiddenTechnicalDomains');
  if (hiddenDomains) {
    hiddenDomains.value = selectedFocus.length > 0 ? selectedFocus.join(', ') : 'None specified';
  }

  const subjectField = document.getElementById('emailSubject');
  if (subjectField) {
    subjectField.value = `⚡ New MosGrid Application + Resume Attached: ${candName}`;
  }

  isCandidateSubmitting = true;
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.7';
    btn.innerHTML = `<span>Uploading Resume & Dispatching Application...</span>`;
  }

  setTimeout(() => {
    if (isCandidateSubmitting) {
      completeCandidateSubmissionUI();
    }
  }, 4500);

  return true;
}

function completeCandidateSubmissionUI() {
  isCandidateSubmitting = false;
  const btn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');
  const form = document.getElementById('mosgridForm');
  const dropContent = document.getElementById('dropzoneContent');
  const filePreview = document.getElementById('filePreview');
  const fileInput = document.getElementById('resumeFile');

  if (btn) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = `<span class="btn-shine"></span><span>Submit Profile & Attached Resume</span><i class="fa-solid fa-paper-plane"></i>`;
  }

  if (status) {
    status.style.color = '#00ff88';
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Profile and Resume attachment successfully dispatched! Thank you for applying to <strong>MosGrid Technologies</strong>.`;
  }

  form?.reset();
  if (fileInput) fileInput.value = '';

  if (dropContent && filePreview) {
    dropContent.style.display = 'flex';
    filePreview.style.display = 'none';
  }

  setTimeout(() => {
    if (status) status.innerHTML = '';
  }, 9000);
}

/* ==========================================================================
   11. Contact Us Section Form Submission
   ========================================================================== */
function handleGeneralContactSubmit(e) {
  const btn = document.getElementById('contactSubmitBtn');
  const nameInput = document.getElementById('contactName');
  const name = nameInput ? nameInput.value.trim() : 'Client';
  const inquiryInput = document.getElementById('inquiryType');
  const inquiry = inquiryInput ? inquiryInput.value : 'General Inquiry';

  const subjectField = document.getElementById('contactSubject');
  if (subjectField) {
    subjectField.value = `⚡ New MosGrid Inquiry [${inquiry}]: ${name}`;
  }

  isContactSubmitting = true;
  if (btn) {
    btn.disabled = true;
    btn.style.opacity = '0.7';
    btn.innerHTML = `<span>Transmitting Message to MosGrid...</span>`;
  }

  setTimeout(() => {
    if (isContactSubmitting) {
      completeContactSubmissionUI();
    }
  }, 3500);

  return true;
}

function completeContactSubmissionUI() {
  isContactSubmitting = false;
  const btn = document.getElementById('contactSubmitBtn');
  const status = document.getElementById('contactFormStatus');
  const form = document.getElementById('mosgridContactForm');

  if (btn) {
    btn.disabled = false;
    btn.style.opacity = '1';
    btn.innerHTML = `<span class="btn-shine"></span><span>Transmit Message</span><i class="fa-solid fa-paper-plane"></i>`;
  }

  if (status) {
    status.style.color = '#00ff88';
    status.innerHTML = `<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been transmitted successfully. Our engineering desk will respond within 24 hours.`;
  }

  form?.reset();

  setTimeout(() => {
    if (status) status.innerHTML = '';
  }, 9000);
}

/* Listen for hidden iframes load events */
function initIframesListeners() {
  const uploadIframe = document.getElementById('hiddenUploadFrame');
  const contactIframe = document.getElementById('hiddenContactFrame');

  uploadIframe?.addEventListener('load', () => {
    if (isCandidateSubmitting) completeCandidateSubmissionUI();
  });

  contactIframe?.addEventListener('load', () => {
    if (isContactSubmitting) completeContactSubmissionUI();
  });
}