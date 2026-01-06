
// index.tsx - Bootloader Oficial PackScan Pro

/**
 * 1. POLYFILL DE PROCESSO (EXECUÇÃO IMEDIATA)
 * Este bloco é executado instantaneamente para prevenir o erro "process is not defined".
 */
(function() {
  if (typeof window !== 'undefined' && typeof (window as any).process === 'undefined') {
    (window as any).process = {
      env: { 
        NODE_ENV: 'production'
      },
      nextTick: function(cb: any) { setTimeout(cb, 0); },
      browser: true
    };
    console.log("PackScan: Ambiente global preparado.");
  }
})();

/**
 * 2. BOOTSTRAP DINÂMICO
 * Carregamos o React e o App apenas após o polyfill acima estar garantido no escopo global.
 */
async function bootstrap() {
  try {
    // Importações dinâmicas para evitar hoisting de dependências problemáticas
    const [ReactModule, ReactDOMModule, AppModule] = await Promise.all([
      import('react'),
      import('react-dom/client'),
      import('./App.tsx')
    ]);

    const React = ReactModule.default || ReactModule;
    const ReactDOM = ReactDOMModule.default || ReactDOMModule;
    const App = AppModule.default || AppModule;

    const rootElement = document.getElementById('root');
    if (!rootElement) throw new Error("Elemento root não encontrado.");

    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );

  } catch (error: any) {
    console.error("Falha crítica no boot:", error);
    
    // Fallback visual para erros de deploy/inicialização
    const root = document.getElementById('root');
    if (root) {
      root.innerHTML = `
        <div style="padding: 40px; font-family: sans-serif; text-align: center; color: #334155;">
          <div style="background: #fff; border: 1px solid #e2e8f0; padding: 32px; border-radius: 24px; display: inline-block; max-width: 450px; shadow: 0 10px 15px -3px rgba(0,0,0,0.1);">
            <h1 style="color: #ef4444; font-size: 18px; margin-bottom: 12px;">Erro de Inicialização</h1>
            <p style="font-size: 14px; color: #64748b;">Não foi possível carregar os módulos no Vercel.</p>
            <code style="background: #f1f5f9; color: #ef4444; padding: 12px; border-radius: 8px; display: block; text-align: left; font-size: 11px; margin: 16px 0; overflow-x: auto; font-family: monospace;">
              ${error?.message || 'Erro desconhecido'}
            </code>
            <button onclick="window.location.reload()" style="background: #2563eb; color: white; border: none; padding: 10px 20px; border-radius: 10px; font-weight: bold; cursor: pointer;">
              Tentar Novamente
            </button>
          </div>
        </div>
      `;
    }
  }
}

bootstrap();
