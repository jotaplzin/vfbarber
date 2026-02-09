const botao = document.querySelectorAll('.botao');
const modal = document.querySelector('.modal');
const caixa = document.querySelector('.caixa');
const fechar = document.querySelector('.fechar');
const enviar = document.querySelector('.enviar');


// Abre o modal ao clicar no botão de agendamento
botao.forEach(function(botao) {
    botao.addEventListener('click', function() {
        modal.classList.add('aberto');
    });
});
// Fecha o modal ao clicar no botão de fechar
document.querySelector('.fechar').addEventListener('click', function() {
    modal.classList.remove('aberto');
});
//  Fecha o modal ao clicar fora da caixa
modal.addEventListener('click', function(event) {
    if (event.target === modal) {
        modal.classList.remove('aberto');
    }
});
// Impede que o clique na caixa feche o modal
caixa.addEventListener('click', function(event) {
    event.stopPropagation();
});
// Função para enviar a mensagem via WhatsApp
enviar.addEventListener('click', function(event) {

    event.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const data = document.getElementById('data').value;
    const servico = document.getElementById('servico').value;
    const horario = document.getElementById('horario').value;
    const contato = document.getElementById('contato').value;

    if(nome === '' || servico === '' || data === '' || horario === '' || contato === ''){
        alert('Por favor, preencha todos os campos antes de confirmar o agendamento.');
         return;
    }

    salvarAgendamento(data,horario);
    bloquearHorario(data,horario);


    const mensagem = 
    ' NOVO AGENDAMENTO - VFBarber' +
    '\n👤Nome: ' + nome +
    '\n✂️Servico: ' + servico +
    '\n📅Data: ' + data +
    '\n⏰Horario: ' + horario +
    '\n📞Contato: ' + contato;

    const telefone = '5511943382780'; // Substitua pelo numero de telefone desejado

    window.location.href = 'https://wa.me/' + telefone + '?text=' + encodeURIComponent(mensagem);
        
    
});

    function getagendamentos() {
        return JSON.parse(localStorage.getItem('agendamentos')) || [];
    }

    function salvarAgendamento(data,horario) {
        const agendamentos = getagendamentos();
        agendamentos.push({data,horario});
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
    }

    
    function bloquearHorario(data,) {
        const agendamentos = getagendamentos();
        const selecthorario = document.getElementById('horario');

        Array.from(selecthorario.options).forEach(option => {
            option.disabled = false;
        });

        agendamentos.forEach(agendamento => {
            if (agendamento.data === data) {
                Array.from(selecthorario.options).forEach(option => {
                    if (option.value === agendamento.horario) {
                        option.disabled = true;
                    }
                });
            }
        });
    }

    document.getElementById('data').addEventListener('change', function() {
        bloquearHorario(this.value);
    });