/**
 * SIMAC - Form Handler with Supabase Integration
 * Handles contact form submissions and stores in database
 */

// Supabase configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Initialize Supabase client (will be available if Supabase is configured)
let supabase = null;

// Check if Supabase is available
if (typeof window.supabase !== 'undefined' && SUPABASE_URL && SUPABASE_ANON_KEY) {
    supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

// ======================
// Contact Form Handler
// ======================

const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Get form data
        const formData = new FormData(this);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            subject: formData.get('subject'),
            message: formData.get('message'),
            created_at: new Date().toISOString()
        };

        // Validate form
        if (!validateContactForm(data)) {
            return;
        }

        // Disable submit button and show loading
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;

        try {
            // Try to submit to Supabase if available
            if (supabase) {
                await submitToSupabase(data);
            } else {
                // Fallback: just show success message
                console.log('Form data:', data);
            }

            // Show success message
            showFormSuccess();

            // Reset form
            this.reset();

            // Send WhatsApp notification
            sendWhatsAppNotification(data);

        } catch (error) {
            console.error('Form submission error:', error);
            window.SIMAC.showToast(
                'Erro ao enviar mensagem. Por favor, tente novamente ou entre em contato pelo WhatsApp.',
                'error',
                7000
            );
        } finally {
            // Re-enable submit button
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

// ======================
// Form Validation
// ======================

function validateContactForm(data) {
    let isValid = true;

    // Clear previous errors
    document.querySelectorAll('.form-error').forEach(el => el.remove());
    document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

    // Validate name
    const nameInput = document.getElementById('name');
    if (!data.name || data.name.trim().length < 2) {
        window.SIMAC.showFieldError(nameInput, 'Por favor, insira seu nome completo');
        isValid = false;
    }

    // Validate email
    const emailInput = document.getElementById('email');
    if (!data.email || !window.SIMAC.validateEmail(data.email)) {
        window.SIMAC.showFieldError(emailInput, 'Por favor, insira um e-mail válido');
        isValid = false;
    }

    // Validate phone (optional but if provided must be valid)
    const phoneInput = document.getElementById('phone');
    if (data.phone && !window.SIMAC.validatePhone(data.phone)) {
        window.SIMAC.showFieldError(phoneInput, 'Por favor, insira um telefone válido');
        isValid = false;
    }

    // Validate subject
    const subjectInput = document.getElementById('subject');
    if (!data.subject) {
        window.SIMAC.showFieldError(subjectInput, 'Por favor, selecione um assunto');
        isValid = false;
    }

    // Validate message
    const messageInput = document.getElementById('message');
    if (!data.message || data.message.trim().length < 10) {
        window.SIMAC.showFieldError(messageInput, 'Por favor, insira uma mensagem com pelo menos 10 caracteres');
        isValid = false;
    }

    return isValid;
}

// ======================
// Supabase Submission
// ======================

async function submitToSupabase(data) {
    const { error } = await supabase
        .from('contact_submissions')
        .insert([data]);

    if (error) {
        throw error;
    }
}

// ======================
// Success Message
// ======================

function showFormSuccess() {
    // Remove existing success message
    const existingSuccess = document.querySelector('.form-success');
    if (existingSuccess) {
        existingSuccess.remove();
    }

    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <strong>✓ Mensagem enviada com sucesso!</strong><br>
        Entraremos em contato em breve.
    `;

    // Insert before form
    contactForm.parentNode.insertBefore(successMessage, contactForm);

    // Scroll to success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Remove after 10 seconds
    setTimeout(() => {
        successMessage.style.transition = 'opacity 0.5s ease-out';
        successMessage.style.opacity = '0';
        setTimeout(() => successMessage.remove(), 500);
    }, 10000);

    // Show toast
    window.SIMAC.showToast(
        'Mensagem enviada com sucesso! Entraremos em contato em breve.',
        'success',
        5000
    );
}

// ======================
// WhatsApp Notification
// ======================

function sendWhatsAppNotification(data) {
    // Optional: Open WhatsApp with the message
    // This can be used as a backup contact method
    const message = encodeURIComponent(
        `Nova mensagem de contato:\n\n` +
        `Nome: ${data.name}\n` +
        `E-mail: ${data.email}\n` +
        `Telefone: ${data.phone || 'Não informado'}\n` +
        `Assunto: ${data.subject}\n\n` +
        `Mensagem:\n${data.message}`
    );

    // Store the WhatsApp URL for potential use
    const whatsappURL = `https://wa.me/551133686305?text=${message}`;

    // You can optionally auto-open WhatsApp after form submission
    // Uncomment the line below if you want this behavior:
    // window.open(whatsappURL, '_blank');
}

// ======================
// Real-time Field Validation
// ======================

// Add real-time validation on blur
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');

    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                if (this.value.trim().length < 2) {
                    window.SIMAC.showFieldError(this, 'Nome deve ter pelo menos 2 caracteres');
                } else {
                    window.SIMAC.clearFieldError(this);
                }
            }
        });

        nameInput.addEventListener('input', function() {
            if (this.value.trim().length >= 2) {
                window.SIMAC.clearFieldError(this);
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                if (!window.SIMAC.validateEmail(this.value)) {
                    window.SIMAC.showFieldError(this, 'E-mail inválido');
                } else {
                    window.SIMAC.clearFieldError(this);
                }
            }
        });

        emailInput.addEventListener('input', function() {
            if (window.SIMAC.validateEmail(this.value)) {
                window.SIMAC.clearFieldError(this);
            }
        });
    }

    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                if (!window.SIMAC.validatePhone(this.value)) {
                    window.SIMAC.showFieldError(this, 'Telefone inválido');
                } else {
                    window.SIMAC.clearFieldError(this);
                }
            }
        });

        phoneInput.addEventListener('input', function() {
            if (this.value.length >= 10 && window.SIMAC.validatePhone(this.value)) {
                window.SIMAC.clearFieldError(this);
            }
        });
    }

    if (subjectInput) {
        subjectInput.addEventListener('change', function() {
            if (this.value) {
                window.SIMAC.clearFieldError(this);
            }
        });
    }

    if (messageInput) {
        messageInput.addEventListener('blur', function() {
            if (this.value.trim().length > 0) {
                if (this.value.trim().length < 10) {
                    window.SIMAC.showFieldError(this, 'Mensagem deve ter pelo menos 10 caracteres');
                } else {
                    window.SIMAC.clearFieldError(this);
                }
            }
        });

        messageInput.addEventListener('input', function() {
            if (this.value.trim().length >= 10) {
                window.SIMAC.clearFieldError(this);
            }
        });
    }
});
