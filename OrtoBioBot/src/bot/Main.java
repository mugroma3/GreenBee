package bot;

import com.botticelli.messagereceiver.MessageReceiver;

public class Main {
	
	//private static String token = "test";
	private static String token = "greenbee"; //greenBee
    public static void main(String[] args) {
		OrtoBioBot ortoBot = new OrtoBioBot(token);
		MessageReceiver mr = new MessageReceiver(ortoBot, 400, 3);
		mr.ignoreOldMessages();
		mr.start();
	}

}
