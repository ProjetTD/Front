const lang = {
    version: "1.0.0",
    in_progress: "Partie en cours...",
    not_started: "Partie non commencée...",
    finished: "Partie terminée...",
  };
  
  export default {
    install(app) {
      app.config.globalProperties.$lang = {
        get: (label = '') => {
          try {
            return lang[label]
          } catch (error) {
            return label;
          }
        },
      };
    }
  };