// Referência do formulário
const form = document.getElementById('form');

// Querendo ouvir o evento de submit
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
    event.preventDefault(); // Prevenir o comportamento padrão de atualização automática da página quando é clicado no submit

    const gender = getSelectedValue('gender');
    const age = getInputNumberValue('age');
    const weight = getInputNumberValue('weight');
    const height = getInputNumberValue('height');
    const activityLevel = getSelectedValue('activity_level');

  /*  console.log(age);   
    console.log(typeof age);   
    console.log(gender);
    console.log(activityLevel); */   

    // Calculo Taxa Metabólica Basal
    const tmb = Math.round(
        gender === 'female' // Se o sexo indicado for female
        ? (655 + (9.6 * weight) + (1.8 * height) - (4.7 * age)) // Faça isso
        : (66 + (13.7 * weight) + (5 * height) - (6.8 * age)) // Senão faça isso
    );

    // Calculo quantidade que precisa para manter o peso
    const maintenance = Math.round(tmb * Number(activityLevel));

    // Calculo para perder peso
    const loseWeight = maintenance - 450;

     // Calculo para ganhar peso
    const gainWeight = maintenance + 450;
    
    const layout = `
    <h2>Aqui está o resultado:</h2>

        <div class="result-content">
          <ul>
            <li>
              Seu metabolismo basal é de <strong>${tmb} calorias</strong>.
            </li>
            <li>
              Para manter o seu peso você precisa consumir em média <strong>${maintenance} calorias</strong>.
            </li>
            <li>
              Para perder peso você precisa consumir em média <strong>${loseWeight} calorias</strong>.
            </li>
            <li>
              Para ganhar peso você precisa consumir em média <strong>${gainWeight} calorias</strong>.
            </li>
          </ul>
        </div>
    `;

    // Aplicando o resultado e layout no HTML
    const result = document.getElementById('result');
    result.innerHTML = layout; // Inserindo dentro
}

// Função que capta o valor dos inputs que possuem "selects" para escolha
function getSelectedValue(id) {
    const select = document.getElementById(id);
    return select.options[select.selectedIndex].value;
}

// Função que capta o valor dos inputs normais e converte para a number
function getInputNumberValue(id) {
    return Number(document.getElementById(id).value); // "Number" para converter Strings em números
}