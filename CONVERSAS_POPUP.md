# Sistema de Popup de Conversas

## O que foi implementado

Agora ao clicar em qualquer card de conversa no Kanban, um popup (dialog) será aberto mostrando os detalhes completos da conversa.

## Funcionalidades do Popup

### Layout em 3 colunas:
1. **Área de Mensagens (2/3 da largura)**: 
   - Histórico completo da conversa
   - Avatares dos participantes
   - Indicação de mensagens da IA vs humanos
   - Campo de texto para enviar novas mensagens

2. **Sidebar de Detalhes (1/3 da largura)**:
   - **Informações do Cliente**: telefone, email, localização
   - **Métricas**: número de mensagens, tempo decorrido, sentimento
   - **Tags**: urgente, alta prioridade, IA ativa
   - **Atendentes**: lista de todos os atendentes envolvidos
   - **Ações Rápidas**: 
     - Atribuir a mim
     - Escalar conversa
     - Ativar IA

## Componentes Criados

- `ConversationDialog.tsx`: Componente principal do popup com toda a interface

## Componentes Modificados

- `KanbanBoard.tsx`: Gerencia o estado do dialog (qual conversa está aberta)
- `KanbanColumn.tsx`: Passa o callback de clique para os cards
- `ConversationCard.tsx`: Aceita e executa o callback onClick

## Como funciona

1. Usuário clica em um card de conversa
2. O `ConversationCard` chama o callback `onClick`
3. O `KanbanColumn` repassa para o `KanbanBoard`
4. O `KanbanBoard` atualiza o estado e abre o dialog
5. O `ConversationDialog` renderiza com os dados da conversa selecionada

## Próximos passos sugeridos

- Integrar com API real para buscar mensagens
- Implementar envio de mensagens
- Adicionar funcionalidade de atribuição de atendentes
- Implementar ações de escalar e ativar IA
- Adicionar notificações em tempo real
- Implementar histórico de ações na conversa
