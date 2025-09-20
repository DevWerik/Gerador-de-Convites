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


        document.querySelector('.btn-container .btn')?.addEventListener('click', () => this.updatePreview());
    }

    selectTemplate(event) {
        const templateName = event.currentTarget.dataset.template;


        document.querySelectorAll('.template-item').forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
            btn.classList.remove('active');
        });


        event.currentTarget.setAttribute('aria-pressed', 'true');
        event.currentTarget.classList.add('active');

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
        element.style.background = template.background;
        element.style.fontFamily = template.fontFamily;
        element.style.color = template.textColor;
        element.style.padding = '40px';
        element.style.borderRadius = '15px';
        element.style.boxShadow = '0 10px 30px rgba(0,0,0,0.3)';
        element.style.textAlign = 'center';
        element.style.maxWidth = '600px';
        element.style.margin = '0 auto';
        element.style.minHeight = '400px';


        const titulo = element.querySelector('.convite-titulo');
        if (titulo) {
            titulo.style.fontSize = '2.5rem';
            titulo.style.marginBottom = '20px';
            titulo.style.fontWeight = 'bold';
        }

        const divider = element.querySelector('.convite-divider');
        if (divider) {
            divider.style.border = 'none';
            divider.style.height = '2px';
            divider.style.backgroundColor = template.accentColor;
            divider.style.width = '100px';
            divider.style.margin = '20px auto';
        }

        const body = element.querySelector('.convite-body');
        if (body) {
            body.style.padding = '20px 0';
        }

        const anfitriao = element.querySelector('.convite-anfitriao');
        if (anfitriao) {
            anfitriao.style.fontSize = '1.2rem';
            anfitriao.style.marginBottom = '10px';
            anfitriao.style.fontStyle = 'italic';
        }

        const intro = element.querySelector('.convite-intro');
        if (intro) {
            intro.style.fontSize = '1.1rem';
            intro.style.marginBottom = '20px';
        }

        const local = element.querySelector('.convite-local');
        if (local) {
            local.style.fontSize = '1.8rem';
            local.style.fontWeight = 'bold';
            local.style.margin = '20px 0';
        }

        const data = element.querySelector('.convite-data');
        if (data) {
            data.style.fontSize = '1.3rem';
            data.style.margin = '15px 0';
        }

        const hora = element.querySelector('.convite-hora');
        if (hora) {
            hora.style.fontSize = '1.3rem';
            hora.style.margin = '15px 0';
        }

        const mensagem = element.querySelector('.convite-mensagem');
        if (mensagem) {
            mensagem.style.marginTop = '30px';
            mensagem.style.fontSize = '1.1rem';
            mensagem.style.fontStyle = 'italic';
            mensagem.style.backgroundColor = 'rgba(255,255,255,0.1)';
            mensagem.style.padding = '15px';
            mensagem.style.borderRadius = '10px';
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

                const options = {
                    margin: 1,
                    filename: `convite-${data.nomeEvento.replace(/\s+/g, '-').toLowerCase()}.pdf`,
                    image: { type: 'jpeg', quality: 0.98 },
                    html2canvas: {
                        scale: 2,
                        useCORS: true,
                        backgroundColor: null
                    },
                    jsPDF: {
                        unit: 'in',
                        format: 'a4',
                        orientation: 'portrait'
                    }
                };

                window.html2pdf().set(options).from(conviteElement).save();
            };
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

                window.html2canvas(conviteElement, {
                    scale: 2,
                    useCORS: true,
                    backgroundColor: null,
                    width: 600,
                    height: 800
                }).then(canvas => {
                    const link = document.createElement('a');
                    link.download = `convite-${data.nomeEvento.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.href = canvas.toDataURL();
                    link.click();
                });
            };
        } catch (error) {
            console.error('Erro ao gerar imagem:', error);
            this.showMessage('Erro ao gerar imagem. Tente novamente.', 'error');
        }
    }

    showMessage(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 1000;
      animation: slideIn 0.3s ease-out;
      background-color: ${type === 'error' ? '#dc3545' : '#28a745'};
    `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
}

const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOut {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
  
  .template-item.active {
    border: 2px solid #007bff;
    background-color: #e3f2fd;
  }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    window.conviteGenerator = new ConviteGenerator();
});


window.ConviteGenerator = ConviteGenerator;