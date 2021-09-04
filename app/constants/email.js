module.exports = {
    FROM: 'ExplorAstro <contact@explorastro.com>',
    FORGOT_PASSWORD: {
        SUBJECT: 'Vous avez demandé à réinitialiser votre mot de passe',
        BODY: `
        Vous avez demandé à réinitialiser votre mot de passe.
        Si vous n'êtes pas à l'origine de cette demande, ignorez ce message.
        Sinon, cliquez sur le lien ci-dessous pour réinitialiser votre mot de passe:
        `,
    },
    REPORT: {
        SUBJECT: 'Nouveau rapport Explorastro :',
        BODY: 
        `Un nouveau rapport a été envoyé.
        Voici les informations le concernant:
        `,
        TO: process.env.EXPLORASTRO_EMAIL,
    },
}