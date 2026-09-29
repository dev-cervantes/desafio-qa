document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('cadastroForm');
    const successModal = document.getElementById('success-modal');
    const termosModal = document.getElementById('termos-modal');
    const termosLink = document.getElementById('termos-link');
    const aceitarTermosBtn = document.getElementById('aceitar-termos-btn');
    const okBtn = document.getElementById('ok-btn');
    const closeButtons = document.querySelectorAll('.close');

    // Verificando se os elementos foram encontrados corretamente
    console.log('okBtn:', okBtn);
    console.log('aceitarTermosBtn:', aceitarTermosBtn);
    console.log('closeButtons:', closeButtons);


    // Manipuladores de eventos para os modais
    aceitarTermosBtn.addEventListener('click', function () {
        const termosCheckbox = document.getElementById('termos');
        termosCheckbox.disabled = false;
        termosCheckbox.checked = true;
        termosModal.style.display = 'none';
    });

    okBtn.addEventListener('click', function () {
        successModal.style.display = 'none';
        // Reseta o formulário apenas quando o usuário confirma o sucesso
        form.reset();
    });

    closeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            successModal.style.display = 'none';
            termosModal.style.display = 'none';

        });
    });

    // Fecha os modais quando clica fora deles
    window.addEventListener('click', function (event) {
        if (event.target === successModal) {
            successModal.style.display = 'none';
            form.reset();
        }
        if (event.target === termosModal) {
            termosModal.style.display = 'none';
        }
    });

    termosLink.addEventListener('click', function (e) {
        e.preventDefault();
        termosModal.style.display = 'block';

    });

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Validações básicas
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const telefone = document.getElementById('telefone').value;
        const cpf = document.getElementById('cpf').value;
        const dataNascimento = document.getElementById('data-nascimento').value;
        const senha = document.getElementById('senha').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;

        // Limpa mensagens de erro anteriores
        document.querySelectorAll('.error-message').forEach(function (el) {
            el.textContent = '';
        });

        let hasError = false;

        // Validações simples
        if (!nome) {
            document.getElementById('nome-error').textContent = 'Nome e sobrenome são obrigatórios';
            hasError = true;
        } else {
            const palavrasNome = nome.trim().split(/\s+/);

            if (palavrasNome.length < 2) {
                document.getElementById('nome-error').textContent = 'Informe seu nome e sobrenome';
                hasError = true;
            } else if (!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)) {
                document.getElementById('nome-error').textContent = 'Informe um nome válido';
                hasError = true;
            }
        }

        if (!email) {
            document.getElementById('email-error').textContent = 'E-mail é obrigatório';
            hasError = true;
        } else if (!validateEmail(email)) {
            document.getElementById('email-error').textContent = 'E-mail inválido';
            hasError = true;
        }

        if (!telefone) {
            document.getElementById('telefone-error').textContent = 'Telefone é obrigatório';
            hasError = true;
        } else if (!validarTelefone(telefone)) {
            document.getElementById('telefone-error').textContent = 'Telefone inválido';
            hasError = true;
        }

        if (!cpf) {
            document.getElementById('cpf-error').textContent = 'CPF é obrigatório';
            hasError = true;
        } else if (!validarCPF(cpf)) {
            document.getElementById('cpf-error').textContent = 'CPF inválido';
            hasError = true;
        }
        if (!dataNascimento) {
            document.getElementById('data-nascimento-error').textContent = 'Data de nascimento é obrigatória';
            hasError = true;
        }

        if (!senha) {
            document.getElementById('senha-error').textContent = 'Senha é obrigatória';
            hasError = true;
        } else {
            const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);
            const temMaiuscula = /[A-Z]/.test(senha);
            const temNumero = /[0-9]/.test(senha);

            if (temMaiuscula) {
                document.getElementById('senha-error').textContent = 'Senha inválida';
                hasError = true;
            } else if (!temEspecial || !temNumero) {
                document.getElementById('senha-error').textContent = 'A senha deve conter caractere especial, letra maiúscula, número e no mínimo 8 caracteres';
                hasError = true;
            }
        }

        if (!hasError) {
            successModal.style.display = 'block';
        }
    })
})

// Funções auxiliares
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validarTelefone(telefone) {
    // Aceita (11) 91234-5678 ou (11) 1234-5678
    const regex = /^\(\d{2}\)\s?\d{4,5}-\d{4}$/;
    return regex.test(telefone);
}


const telefoneInput = document.getElementById('telefone');

telefoneInput.addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, '');

    if (value.length > 11) value = value.slice(0, 11);

    if (value.length <= 10) {
        // Formato: (00) 0000-0000
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
    } else {
        // Formato: (00) 00000-0000
        value = value.replace(/(\d{2})(\d{5})(\d{0,4})/, '($1) $2-$3');
    }

    e.target.value = value;
});


document.addEventListener('DOMContentLoaded', function () {
    const cpfInput = document.getElementById('cpf');

    cpfInput.addEventListener('input', function (e) {
        let value = e.target.value.replace(/\D/g, '');

        if (value.length > 11) value = value.slice(0, 11);

        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d)/, '$1.$2');
        value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

        e.target.value = value;
    });
});

function validarCPF(cpf) {
    cpf = cpf.replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf.charAt(i)) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf.charAt(i)) * (11 - i);
    }

    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    return resto === parseInt(cpf.charAt(10));
}

