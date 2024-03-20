const ElementorFormKeys = {
    'Nome *': 'nome',
    'Data de nascimento *': 'data_nascimento',
    'Email *': 'email',
    'Telefone\\/Telemóvel *': 'telefone_telemovel',
    'Dados académicos': 'dados_academicos',
    'Qual o seu nível de habilitações? *': 'nivel_habilitacoes',
    'Se no campo anterior indicou \\Outro\\"': 'outra_habilitacao',
    ' qual é o seu nível de formação?"': "nivel_formacao",
    'No caso de já ter formação da área das tecnologias, indique qual': 'area_tecnologia',
    'É aluno do Iscte - Instituto Universitário de Lisboa ou de uma das suas Entidades Participadas? *': 'aluno_iscte',
    'Caso seja aluno do Iscte - Instituto Universitário de Lisboa ou de uma das suas Entidades Participadas indique o seu número de estudante': 'numero_estudante_iscte',
    'É docente, investigador ou colaborador do Iscte ou de uma das suas Entidades Participadas? *': 'docente_investigador_colaborador',
    'Caso seja, indique o seu email institucional': 'email_institucional',
    'Dados profissionais': 'dados_profissionais',
    'Qual é a sua situação a nível de emprego?': 'nivel_emprego',
    'Dados de faturação': 'dados_faturacao',
    'Nome * ': 'nome_faturacao',
    'Morada * ': 'morada_faturacao',
    'Código Postal * ': 'codigo_postal_faturacao',
    'Email * ': 'email_faturacao',
    'Número de Contribuinte (NIF) * ': 'numero_contribuinte_faturacao',
    'Tratamento de dados': 'tm',
    '': 'aceito_receber_info',
    'Se sim, através dos seguintes meios': 'meios_contato',
    'Pagamento Efetuado': 'pagamento_efetuado',
    'Created At': 'data_inscricao'
};

const TeamsFormKeys = {

    'Email': 'reject_email',
    'E-mail': 'email',
    'Nome completo\n': 'nome',
    'Data de Nascimento\n': 'data_nascimento',
    'País de Nascimento': 'pais_nascimento',
    'Tipo de Documento de Identificação\n': 'tipo_documento_identificacao',
    'Número do Documento de Identificação\n': 'numero_documento_identificacao',
    'Dígitos de Controlo (só para portadores/as de Cartão de Cidadão)\n': 'digitos_controlo',
    'Número de Segurança Social\n': 'numero_seguranca_social',
    'NIF': 'numero_identificacao_fiscal',
    'Número de Telemóvel\n': 'telefone_telemovel',
    'E-mail\n': 'email_faturacao',
    'Género': 'genero',
    'Nacionalidade (País)\n': 'nacionalidade',
    'Morada': 'morada',
    'Código Postal\n': 'codigo_postal',
    'Cidade de residência \n\n': 'cidade_residencia',
    'País de Residência': 'pais_residencia',
    'Nome\n': 'nome_faturacao',
    'Morada \n': 'morada_faturacao',
    'Número de Contribuinte\n': 'numero_contribuinte_faturacao',
    'Observações sobre faturação\n': 'observacoes_faturacao'
};


const FieldsToDelete = [
    'Dados pessoais',
    'dados_academicos',
    'dados_profissionais',
    'dados_faturacao',
    'Form Name (ID)',
    'User ID',
    'User IP',
    'Referrer',
    'tm',
    'ID',
    'Start time',
    'reject_email',
    'Completion time',
    'reject_email',
    'Name',
    'Last modified time',
    'observacoes_faturacao',
    'Submission ID',
    'User Agent',

];


const AllKeys = [
    'nome', 'data_nascimento', 'email', 'telefone_telemovel', 'nivel_habilitacoes',
    'outra_habilitacao', 'nivel_formacao', 'area_tecnologia', 'aluno_iscte',
    'numero_estudante_iscte', 'docente_investigador_colaborador', 'email_institucional',
    'nivel_emprego', 'nome_faturacao', 'morada_faturacao', 'email_faturacao',
    'codigo_postal_faturacao', 'numero_contribuinte_faturacao',
    'aceito_receber_info', 'meios_contato', 'id_curso', 'data_inscricao', 'pais_nascimento',
    'tipo_documento_identificacao', 'numero_documento_identificacao', 'digitos_controlo',
    'numero_seguranca_social', 'numero_identificacao_fiscal',
    'genero', 'nacionalidade', 'morada', 'codigo_postal', 'cidade_residencia',
    'pais_residencia'
];


const BooleanFields = [
    //'aluno_iscte',
    //'docente_investigador_colaborador',
    'aceito_receber_info',
    //'pagamento_efetuado',
    'autoriza_envio_info',
];

module.exports = {ElementorFormKeys, TeamsFormKeys, FieldsToDelete, AllKeys, BooleanFields};