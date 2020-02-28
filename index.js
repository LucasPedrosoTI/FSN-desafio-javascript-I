// Base a ser utilizada
const moment = require('moment');

const alunosDaEscola = [{ nome: "Henrique", notas: [], cursos: [], faltas: 5 }, { nome: "Edson", notas: [], cursos: [], faltas: 2 }, { nome: "Bruno", notas: [10, 9.8, 9.6], cursos: [], faltas: 0 }, { nome: "Guilherme", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "Full Stack", dataMatricula: moment().format("DD/MM/YYYY") }], faltas: 0 }, { nome: "Carlos", notas: [], cursos: [], faltas: 0 }, { nome: "Lucca", notas: [10, 9.8, 9.6], cursos: [{ nomeDoCurso: "UX", dataMatricula: moment().format("DD/MM/YYYY") }], faltas: 0 }];

// implementação

function adicionarAluno(nome) {

    /*Essa função irá receber uma * que é nome do aluno a ser criado. 
    E seguindo o modelo de aluno, o mesmo deverá ser inserido na lista de alunos.
    A função deve devolver um feedback de sucesso, caso o aluno seja inserido corretamente.*/

    let novoAluno = { "nome": nome }
    alunosDaEscola.push(novoAluno);
    for (const aluno of alunosDaEscola) {
        if (aluno.nome == novoAluno.nome) { console.log("Parabéns, aluno adicionado com sucesso!") };
    }
}


function listarAlunos() {

    /*Com essa função o usuário poderá ver todos os alunos cadastrados atualmente no sistema. 
    Vale dizer que As informações deverão ser exibidas em um formato amigável.*/
    for (const aluno of alunosDaEscola) {
        console.log(
            `-----------------------------------------------------------------------
                        Nome: ${aluno.nome}
                        Notas ${aluno.notas.join(' | ')}
                        Cursos: ${aluno.cursos}
                        Faltas ${aluno.faltas}
-----------------------------------------------------------------------`
        );
    }
}


function buscarAluno(nome) {
    /* Por meio dessa função, podemos pesquisar um aluno por nome na lista de aluno. 
    Ela deverá exibir um feedback, tanto para quando encontrar o aluno, tanto quando não encontrar. 
    E deverá devolver um aluno em seu retorno. */

    let isAluno = false

    for (const aluno of alunosDaEscola) {

        if (aluno.nome == nome) {
            isAluno = true;
            ({ nome, notas, cursos, faltas } = aluno);
        }
    }

    isAluno ? (
        cursoString = JSON.stringify(cursos).replace(/[^a-z A-Z 0-9 / :]/g, " "),
        console.log(
            `Aluno encontrado:
            Nome: ${nome} 
            Notas: ${notas.join(' | ')}
            Cursos: ${cursoString}
            Faltas: ${faltas}`
        ))
        : console.log(`Esse aluno não existe 🙁. Cadastre o aluno antes de continuar`);
}


function matricularAluno(nome, curso) {

    /* Essa funcionalidade irá permitir, cadastrar um aluno em um curso. 
    Essa função só poderá ser executada em um aluno já devidamente cadastrado no sistema, 
    e deverá armazenar a data atual no momento da matricula
    Lembre-se de exibir o feedback para o usuário. */
    let isAluno = false
    let hoje = moment().format("DD/MM/YYYY");

    for (const aluno of alunosDaEscola) {
        if (aluno.nome == nome) {
            isAluno = true;
            aluno.cursos.push({ nomeDoCurso: curso, dataMatricula: hoje })

            console.log(`O Aluno ${aluno.nome} foi matriculado com sucesso no curso ${curso}:`)
        }
    }
    if (!isAluno) { console.log("Esse aluno não existe 🙁. Cadastre o aluno antes de continuar!") }
}

function aplicarFalta(nome) {
    /*
     Ao receber um aluno devidamente cadastrado em nossa lista. 
     Você deverá incrementar uma falta ao aluno. 
     Você deverá dar um feedback ao concluir a tarefa. 
     Só poderá aplicar falta em aluno se o mesmo tiver matriculado em um curso.
    */
    let isAluno = false;
    let matriculado = false;
    for (const aluno of alunosDaEscola) {
        if (aluno.nome == nome) {
            isAluno = true;
            if (aluno.cursos.length > 0) {
                matriculado = true;
                aluno.faltas++
                console.log(`Falta aplicada com sucesso. Total de faltas do aluno ${aluno.nome}: ${aluno.faltas}`);
            }
        }
    }
    if (!matriculado && isAluno) { console.log("Aluno não está matriculado em nenhum curso. Matricule o aluno antes de continuar") }
    if (!isAluno) { console.log("Esse aluno não existe 🙁. Cadastre o aluno antes de continuar!") }
}

// matricularAluno("Edson", "ADS")


function aplicarNota(nome, nota) {
    /*
     Ao receber um aluno devidamente cadastrado em nossa lista. 
     Você deverá adicionar uma nota ao aluno na sua lista de notas. 
     Você deverá dar um feedback ao concluir a tarefa. 
     Só poderá aplicar nota em aluno se o mesmo tiver matriculado em um curso.
    */
    let isAluno = false;
    let matriculado = false;
    for (const aluno of alunosDaEscola) {
        if (aluno.nome == nome) {
            isAluno = true;
            if (aluno.cursos.length > 0) {
                matriculado = true;
                aluno.notas.push(nota)
                console.log(`Nota aplicada com sucesso. Notas do aluno ${aluno.nome}: ${aluno.notas.join(" | ")}`);
            }
        }
    }
    if (!matriculado && isAluno) { console.log("Aluno não está matriculado em nenhum curso. Matricule o aluno antes de continuar") }
    if (!isAluno) { console.log("Esse aluno não existe 🙁. Cadastre o aluno antes de continuar!") }
}

// aplicarNota("Lucca", 10);

// aplicarNota("Edson", 10);

// aplicarNota("Luccas", 10);

function aprovarAluno(nome) {
    /* 
    Ao receber um aluno devidamente cadastrado em nossa lista, deverá dizer se o mesmo está aprovado ou não. 
    Os critérios de aprovação são: ter no máximo 3 faltas e média 7 em notas.
    Só o aluno só poderá ser aprovado se o mesmo tiver matriculado em um curso.
    */
    let isAluno = false;
    let matriculado = false;
    let media = 0;

    for (const aluno of alunosDaEscola) {
        if (aluno.nome == nome) {
            isAluno = true;
            if (aluno.cursos.length > 0) {
                matriculado = true;
                var total = aluno.notas.reduce((acum, atual) => acum + atual)
                media += total / aluno.notas.length;
                console.log(`Média do aluno ${aluno.nome}: ${media}
Total de faltas: ${aluno.faltas}`);
                    if (media >= 7 && aluno.faltas <= 3 ){console.log("Aluno Aprovado")} else {console.log("Aluno Reprovado!")}
            }
        }
    }
    if (!matriculado && isAluno) { console.log("Aluno não está matriculado em nenhum curso. Matricule o aluno antes de continuar") }
    if (!isAluno) { console.log("Esse aluno não existe 🙁. Cadastre o aluno antes de continuar!") }

}

matricularAluno("Edson", "ADS")
aplicarNota("Edson",6);
aplicarNota("Edson",6);
aplicarNota("Edson",6);
aplicarNota("Edson",10);

aprovarAluno("Edson")