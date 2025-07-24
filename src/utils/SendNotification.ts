import * as Notifications from "expo-notifications";

export async function sendNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "⚡ Adicione cartas ao seu Deck!",
      body: "Você precisa adicionar cartas para poder duelar com outros duelistas. Monte seu deck e prepare-se para a batalha!",
    },
    trigger: { seconds: 3 },
  });
}
