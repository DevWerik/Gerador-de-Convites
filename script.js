class ConviteGenerator {
    constructor() {
        this.currentTemplate = 'elegante';
        this.templates = {
            elegante: {
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontFamily: 'Georgia, serif',
                textColor: '#ffffff',
                accentColor: '#f8f9fa',
                shape: 'circle',
                shapeColor: '#fff'
            },
            moderno: {
                background: 'linear-gradient(135deg, #93aafb 0%, #f5576c 100%)',
                fontFamily: 'Arial, sans-serif',
                textColor: '#ffffff',
                accentColor: '#fff3cd',
                shape: 'square',
                shapeColor: '#000'
            },
            criativo: {
                background: 'linear-gradient(135deg, #894ffe 0%, #24c7cc 100%)',
                fontFamily: 'Comic Sans MS, cursive',
                textColor: '#2c3e50',
                accentColor: '#ffffff',
                shape: 'triangle',
                shapeColor: '#24c7cc'
            },
            minimalista: {
                background: '#f8f9fa',
                fontFamily: 'Helvetica, Arial, sans-serif',
                textColor: '#343a40',
                accentColor: '#6c757d',
                shape: 'square',
                shapeColor: '#6c757d'
            }
        };

        this.init();
    }

    init() {
        this.bindEvents();
        this.updatePreview();
    }

    bindEvents() {
        const formFields = ['nomeEvento', 'dataEvento', 'horaEvento', 'localEvento', 'anfitriao', 'mensagem'];
        formFields.forEach(field => {
            const element = document.getElementById(field);
            if (element) {
                element.addEventListener('input', () => this.updatePreview());
            }
        });

        document.querySelectorAll('.template-item').forEach(button => {
            button.addEventListener('click', (e) => this.selectTemplate(e));
        });

        document.getElementById('baixarPdf')?.addEventListener('click', () => this.downloadPDF());
        document.getElementById('baixarImg')?.addEventListener('click', () => this.downloadImage());
    }

    selectTemplate(event) {
        const templateName = event.currentTarget.dataset.template;

        document.querySelectorAll('.template-item').forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('ativo');
        });

        event.currentTarget.setAttribute('aria-pressed', 'true');
        event.currentTarget.classList.add('ativo');

        this.currentTemplate = templateName;
        this.updatePreview();
    }

    getFormData() {
        return {
            nomeEvento: document.getElementById('nomeEvento')?.value || 'Meu Evento',
            dataEvento: this.formatDate(document.getElementById('dataEvento')?.value),
            horaEvento: this.formatTime(document.getElementById('horaEvento')?.value),
            localEvento: document.getElementById('localEvento')?.value || 'Local do Evento',
            anfitriao: document.getElementById('anfitriao')?.value || 'Convidados',
            mensagem: document.getElementById('mensagem')?.value || 'Venha celebrar conosco este momento especial!'
        };
    }

    formatDate(dateString) {
        if (!dateString) return '31 de dezembro de 2025';

        const date = new Date(dateString + 'T00:00:00');
        const months = [
            'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
            'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
        ];

        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} de ${month} de ${year}`;
    }

    formatTime(timeString) {
        if (!timeString) return 'às 19:00';

        const [hours, minutes] = timeString.split(':');
        return `às ${hours}:${minutes}`;
    }

    updatePreview() {
        const data = this.getFormData();
        const template = this.templates[this.currentTemplate];
        const conviteElement = document.querySelector('.convite');

        if (!conviteElement) return;

        conviteElement.querySelector('.convite-titulo').textContent = data.nomeEvento;
        conviteElement.querySelector('.convite-anfitriao').textContent = data.anfitriao;
        conviteElement.querySelector('.convite-local').textContent = data.localEvento;
        conviteElement.querySelector('.convite-data').textContent = data.dataEvento;
        conviteElement.querySelector('.convite-hora').textContent = data.horaEvento;
        conviteElement.querySelector('.convite-mensagem p').textContent = data.mensagem;

        this.applyTemplate(conviteElement, template);
    }

    applyTemplate(element, template) {
        element.style.cssText = '';
        
        element.style.background = template.background;
        element.style.fontFamily = template.fontFamily;
        element.style.color = template.textColor;
        element.style.padding = 'clamp(1rem, 4vw, 2.5rem)';
        element.style.borderRadius = '15px';
        element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        element.style.textAlign = 'center';
        element.style.width = '100%';
        element.style.maxWidth = '450px';
        element.style.margin = '0 auto';
        element.style.minHeight = 'clamp(300px, 50vh, 500px)';
        element.style.display = 'flex';
        element.style.flexDirection = 'column';
        element.style.justifyContent = 'center';

        const titulo = element.querySelector('.convite-titulo');
        if (titulo) {
            titulo.style.fontSize = 'clamp(1.2rem, 5vw, 2.5rem)';
            titulo.style.marginBottom = 'clamp(0.5rem, 3vw, 1.25rem)';
            titulo.style.fontWeight = 'bold';
            titulo.style.lineHeight = '1.2';
        }

        const divider = element.querySelector('.convite-divider');
        if (divider) {
            divider.style.border = 'none';
            divider.style.height = '2px';
            divider.style.backgroundColor = template.accentColor;
            divider.style.width = 'clamp(60px, 20%, 100px)';
            divider.style.margin = 'clamp(0.75rem, 3vw, 1.25rem) auto';
        }

        const body = element.querySelector('.convite-body');
        if (body) {
            body.style.padding = 'clamp(0.75rem, 3vw, 1.25rem) 0';
            body.style.flex = '1';
            body.style.display = 'flex';
            body.style.flexDirection = 'column';
            body.style.justifyContent = 'center';
        }

        const anfitriao = element.querySelector('.convite-anfitriao');
        if (anfitriao) {
            anfitriao.style.fontSize = 'clamp(0.9rem, 3.5vw, 1.2rem)';
            anfitriao.style.marginBottom = 'clamp(0.25rem, 2vw, 0.625rem)';
            anfitriao.style.fontStyle = 'italic';
        }

        const intro = element.querySelector('.convite-intro');
        if (intro) {
            intro.style.fontSize = 'clamp(0.8rem, 3vw, 1.1rem)';
            intro.style.marginBottom = 'clamp(0.75rem, 3vw, 1.25rem)';
        }

        const local = element.querySelector('.convite-local');
        if (local) {
            local.style.fontSize = 'clamp(1.1rem, 4.5vw, 1.8rem)';
            local.style.fontWeight = 'bold';
            local.style.margin = 'clamp(0.75rem, 3vw, 1.25rem) 0';
            local.style.lineHeight = '1.2';
        }

        const data = element.querySelector('.convite-data');
        if (data) {
            data.style.fontSize = 'clamp(0.9rem, 3.5vw, 1.3rem)';
            data.style.margin = 'clamp(0.5rem, 2.5vw, 0.9375rem) 0';
        }

        const hora = element.querySelector('.convite-hora');
        if (hora) {
            hora.style.fontSize = 'clamp(0.9rem, 3.5vw, 1.3rem)';
            hora.style.margin = 'clamp(0.5rem, 2.5vw, 0.9375rem) 0';
        }

        const mensagem = element.querySelector('.convite-mensagem');
        if (mensagem) {
            mensagem.style.marginTop = 'clamp(1rem, 4vw, 1.875rem)';
            mensagem.style.fontSize = 'clamp(0.8rem, 3vw, 1.1rem)';
            mensagem.style.fontStyle = 'italic';
            mensagem.style.backgroundColor = 'rgba(255,255,255,0.1)';
            mensagem.style.padding = 'clamp(0.75rem, 3vw, 0.9375rem)';
            mensagem.style.borderRadius = '10px';
            mensagem.style.lineHeight = '1.4';
        }
    }

    async downloadPDF() {
        try {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
            document.head.appendChild(script);

            script.onload = () => {
                const conviteElement = document.querySelector('.convite');
                const data = this.getFormData();

                const originalMaxWidth = conviteElement.style.maxWidth;
                const originalPadding = conviteElement.style.padding;
                
                conviteElement.style.maxWidth = '600px';
                conviteElement.style.padding = '40px';

                const options = {
                    margin: 0.5,
                    filename: `convite-${data.nomeEvento.replace(/\s+/g, '-').toLowerCase()}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: null,
                        width: 700,
                        height: 900
                    },
                    jsPDF: {
                        unit: 'in',
                        format: 'a4',
                        orientation: 'portrait'
                    }
                };

                window.html2pdf().set(options).from(conviteElement).save().then(() => {
                    conviteElement.style.maxWidth = originalMaxWidth;
                    conviteElement.style.padding = originalPadding;
                });
            };

            this.showMessage('Gerando PDF...', 'info');
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
            this.showMessage('Erro ao gerar PDF. Tente novamente.', 'error');
        }
    }

    async downloadImage() {
        try {
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
            document.head.appendChild(script);

            script.onload = () => {
                const conviteElement = document.querySelector('.convite');
                const data = this.getFormData();

                const originalMaxWidth = conviteElement.style.maxWidth;
                const originalPadding = conviteElement.style.padding;
                
                conviteElement.style.maxWidth = '600px';
                conviteElement.style.padding = '40px';

                window.html2canvas(conviteElement, {
                    scale: 3,
                    useCORS: true,
                    backgroundColor: null,
                    width: 700,
                    height: 900,
                    logging: false
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `convite-${data.nomeEvento.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = canvas.toDataURL('image/png', 1.0);
                    link.click();

                    conviteElement.style.maxWidth = originalMaxWidth;
                    conviteElement.style.padding = originalPadding;
                    
                    this.showMessage('Imagem baixada com sucesso!', 'success');
                });
            };

            this.showMessage('Gerando imagem...', 'info');
        } catch (error) {
            console.error('Erro ao gerar imagem:', error);
            this.showMessage('Erro ao gerar imagem. Tente novamente.', 'error');
        }
    }

    showMessage(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        const colors = {
            info: '#17a2b8',
            success: '#28a745',
            error: '#dc3545'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            left: 20px;
            max-width: 300px;
            margin: 0 auto;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            font-size: 0.9rem;
            z-index: 1000;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            animation: slideInDown 0.3s ease-out;
            background-color: ${colors[type] || colors.info};
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOutUp 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, type === 'info' ? 2000 : 3000);
    }
}

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInDown {
        from {
            transform: translateY(-100%);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutUp {
        from {
            transform: translateY(0);
            opacity: 1;
        }
        to {
            transform: translateY(-100%);
            opacity: 0;
        }
    }
    
    /* Mobile specific notification styles */
    @media (max-width: 767px) {
        .notification {
            left: 10px !important;
            right: 10px !important;
            max-width: none !important;
            font-size: 0.85rem !important;
            padding: 12px 16px !important;
        }
    }
`;
document.head.appendChild(style);


document.addEventListener('DOMContentLoaded', () => {
    window.conviteGenerator = new ConviteGenerator();
});