import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft, Search, Sparkles } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-background to-muted/30">
      <div className="text-center px-4 max-w-2xl mx-auto">
        {/* Animated 404 */}
        <div className="relative mb-8">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
          </div>
          <h1 className="relative text-9xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-500 bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-700">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="flex justify-center mb-6 animate-in fade-in slide-in-from-bottom-6 duration-700" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/10 to-cyan-500/10 flex items-center justify-center">
            <Search className="w-10 h-10 text-primary" />
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-8 animate-in fade-in slide-in-from-bottom-8 duration-700" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
          <h2 className="text-3xl font-bold text-foreground">Página não encontrada</h2>
          <p className="text-lg text-muted-foreground max-w-md mx-auto">
            Desculpe, a página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-sm text-muted-foreground">
            Caminho tentado: <code className="px-2 py-1 bg-muted rounded text-xs">{location.pathname}</code>
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-10 duration-700" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-primary to-cyan-500 text-white rounded-lg font-medium hover:from-primary/90 hover:to-cyan-500/90 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
            Voltar para Home
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-medium hover:bg-muted/80 transition-all duration-200 group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Voltar
          </button>
        </div>

        {/* Suggestions */}
        <div className="mt-12 p-6 bg-card rounded-xl border border-border animate-in fade-in zoom-in-50 duration-700" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Páginas populares</h3>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            >
              Dashboard
            </Link>
            <Link
              to="/conversations"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            >
              Conversas
            </Link>
            <Link
              to="/agents"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            >
              Agentes
            </Link>
            <Link
              to="/analytics"
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
            >
              Analytics
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
