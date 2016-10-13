package bot;

import com.botticelli.messagereceiver.MessageReceiver;

public class Main {
	
	private static String token = "211365415:AAFhGAjqhfYsc0hKoFB8UD9uwn1Dv24xweU";
	//private static String token = "262134854:AAFt2QT4BUSC-mFOMIw33zOd9Fr8J-SVKgE"; //greenBee
    public static void main(String[] args) {
		OrtoBioBot ortoBot = new OrtoBioBot(token);
		MessageReceiver mr = new MessageReceiver(ortoBot, 400, 3);
		mr.ignoreOldMessages();
		mr.start();
	}

}
