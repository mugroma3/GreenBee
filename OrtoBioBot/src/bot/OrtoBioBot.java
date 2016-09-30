package bot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.botticelli.bot.Bot;
import com.botticelli.bot.request.methods.MessageToSend;
import com.botticelli.bot.request.methods.types.CallbackQuery;
import com.botticelli.bot.request.methods.types.ChosenInlineResult;
import com.botticelli.bot.request.methods.types.InlineQuery;
import com.botticelli.bot.request.methods.types.KeyboardButton;
import com.botticelli.bot.request.methods.types.Message;
import com.botticelli.bot.request.methods.types.ReplyKeyboardMarkupWithButtons;

import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;

public class OrtoBioBot extends Bot {

	public static final String messaggioScegliLingua = "Scegli la tua lingua \n Choose your language";
	public static final String messaggioBenvenuto = "Benvenuto in GreenBeeBot \n Welcome in GreenBeeBot";
	private ReplyKeyboardMarkupWithButtons languageKeyboard;
	private HashMap<Long, StatoUtente> statiUtenti;

	public OrtoBioBot(String token) {
		super(token);
		statiUtenti = new HashMap<>();
		List<List<KeyboardButton>> keyboard = new ArrayList<List<KeyboardButton>>();
		List<KeyboardButton> line = new ArrayList<>();
		line.add(new KeyboardButton(Italiano.italiano));
		line.add(new KeyboardButton(English.ENGLISH));
		keyboard.add(line);
		languageKeyboard = new ReplyKeyboardMarkupWithButtons(keyboard);
		languageKeyboard.setResizeKeyboard(true);
		languageKeyboard.setOneTimeKeyboard(true);
	}

	@Override
	public void textMessage(Message arg0) {

		String text = arg0.getText();

		if (text.equals("/start")) {
			if (userIsNew(arg0.getFrom().getId())) 
			{
				sendMessage(new MessageToSend(arg0.getFrom().getId(), messaggioBenvenuto));
				statiUtenti.put(arg0.getFrom().getId(), new StatoUtente());
			}
			chooseLanguage(arg0);
			    
			return;
		}
		
		if(userIsNew(arg0.getFrom().getId()))
			statiUtenti.put(arg0.getFrom().getId(), new StatoUtente());
		
		if(text.equals(Italiano.italiano))
		{
			if(statiUtenti.get(arg0.getFrom().getId()).getSezione() != SezioniBot.SCEGLILINGUA)
				return;
			statiUtenti.get(arg0.getFrom().getId()).setLingua(Lingue.ITALIANO);
		}
		
	}

	@Override
	public void audioMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void callback_query(CallbackQuery arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void chose_inline_result(ChosenInlineResult arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void contactMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void documentMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void groupChatCreatedMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void groupChatPhotoDeleteMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void inLineQuery(InlineQuery arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void leftChatMemberMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void locationMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void newChatMemberMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void newChatPhotoMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void newChatTitleMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void photoMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void stickerMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void venueMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void videoMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	@Override
	public void voiceMessage(Message arg0) {
		// TODO Auto-generated method stub

	}

	public void chooseLanguage(Message arg0) {
		MessageToSend mts = new MessageToSend(arg0.getFrom().getId(), messaggioScegliLingua);
		mts.setReplyMarkup(languageKeyboard);
		sendMessage(mts);
	}

	public boolean userIsNew(long userid) {
		return !statiUtenti.containsKey(userid);
	}

}
