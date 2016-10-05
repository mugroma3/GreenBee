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

	public static final String testoScegliLingua = "Scegli la tua lingua \nChoose your language";
	public static final String testoBenvenuto = "Benvenuto in GreenBeeBot \nWelcome in GreenBeeBot  \n\n"
			+ "Powered by MUG Roma tre: \nhttps://telegram.me/mugroma3 \nhttp://muglab.uniroma3.it/  "
			+ "\nhttps://www.facebook.com/mugroma3 " + "\nhttps://www.twitter.com/mugroma3  ";

	public static final String contact = "Powered by MUG Roma tre: \nhttps://telegram.me/mugroma3 \nhttp://muglab.uniroma3.it/  "
			+ "\nhttps://www.facebook.com/mugroma3 " + "\nhttps://www.twitter.com/mugroma3  ";
	
	private static final String back = "🔙";
	
	private ReplyKeyboardMarkupWithButtons languageKeyboard;
	private HashMap<Long, StatoUtente> statiUtenti;
	private ReplyKeyboardMarkupWithButtons englishMenuEntry;
	private ReplyKeyboardMarkupWithButtons englishMenuExit;
	private ReplyKeyboardMarkupWithButtons menuItalianoUscita;
	private ReplyKeyboardMarkupWithButtons menuItalianoEntrata;
	private ReplyKeyboardMarkupWithButtons menuMercato;
	private ReplyKeyboardMarkupWithButtons marketMenu;
	private ReplyKeyboardMarkupWithButtons menuCompiti;
	private ReplyKeyboardMarkupWithButtons taskMenu;
	

	public OrtoBioBot(String token) {
		super(token);
		statiUtenti = new HashMap<>();
		List<List<KeyboardButton>> keyboard = new ArrayList<List<KeyboardButton>>();
		List<KeyboardButton> line = new ArrayList<>();
		line.add(new KeyboardButton(Italiano.ITALIANO));
		line.add(new KeyboardButton(English.ENGLISH));
		keyboard.add(line);
		languageKeyboard = new ReplyKeyboardMarkupWithButtons(keyboard);
		languageKeyboard.setResizeKeyboard(true);
		languageKeyboard.setOneTimeKeyboard(true);

		line = new ArrayList<>();
		keyboard = new ArrayList<List<KeyboardButton>>();
		KeyboardButton kb = new KeyboardButton(English.REPENTER, false, true);
		line.add(kb);
		keyboard.add(line);
		englishMenuEntry = new ReplyKeyboardMarkupWithButtons(keyboard);
		englishMenuEntry.setResizeKeyboard(true);
		englishMenuEntry.addLine(English.MARKET, English.TASK, English.CONTACT);
		englishMenuEntry.addLine(English.SETLANGUAGE);

		
		line = new ArrayList<>();
		keyboard = new ArrayList<List<KeyboardButton>>();
	    kb = new KeyboardButton(English.REPEXIT, false, true);
		line.add(kb);
		keyboard.add(line);
		englishMenuExit = new ReplyKeyboardMarkupWithButtons(keyboard);
		englishMenuExit.setResizeKeyboard(true);
		englishMenuExit.addLine(English.MARKET, English.TASK, English.CONTACT);
		englishMenuExit.addLine(English.SETLANGUAGE);
		
		
		
		line = new ArrayList<>();
		keyboard = new ArrayList<List<KeyboardButton>>();
		kb = new KeyboardButton(Italiano.SEGENT, false, true);
		line.add(kb);
		keyboard.add(line);
		menuItalianoEntrata = new ReplyKeyboardMarkupWithButtons(keyboard);
		menuItalianoEntrata.setResizeKeyboard(true);
		menuItalianoEntrata.addLine(Italiano.MERCATO, Italiano.COMPITI, Italiano.CONTATTI);
		menuItalianoEntrata.addLine(Italiano.IMPOSTALINGUA);
		
		
		
		
		line = new ArrayList<>();
		keyboard = new ArrayList<List<KeyboardButton>>();
		kb = new KeyboardButton(Italiano.SEGUSC, false, true);
		line.add(kb);
		keyboard.add(line);
		menuItalianoUscita = new ReplyKeyboardMarkupWithButtons(keyboard);
		menuItalianoUscita.setResizeKeyboard(true);
		menuItalianoUscita.addLine(Italiano.MERCATO, Italiano.COMPITI, Italiano.CONTATTI);
		menuItalianoUscita.addLine(Italiano.IMPOSTALINGUA);
		
		
		keyboard = new ArrayList<List<KeyboardButton>>();
		menuMercato = new ReplyKeyboardMarkupWithButtons(keyboard);
		menuMercato.addLine(Italiano.CONSULTA, Italiano.AGGIUNGI, Italiano.STORICO, back);
		menuMercato.setResizeKeyboard(true);
		
		
		keyboard = new ArrayList<List<KeyboardButton>>();
		marketMenu = new ReplyKeyboardMarkupWithButtons(keyboard);
		marketMenu.addLine(English.BROWSE, English.ADD, English.HISTORY, back);
		marketMenu.setResizeKeyboard(true);
		
		
		keyboard = new ArrayList<List<KeyboardButton>>();
		menuCompiti = new ReplyKeyboardMarkupWithButtons(keyboard);
		menuCompiti.addLine(Italiano.CONSULTA, Italiano.AGGIUNGI, back);
		menuCompiti.setResizeKeyboard(true);
		
		
		keyboard = new ArrayList<List<KeyboardButton>>();
		taskMenu = new ReplyKeyboardMarkupWithButtons(keyboard);
		taskMenu.addLine(English.BROWSE, English.ADD, back);
		taskMenu.setResizeKeyboard(true);
		
	}

	@Override
	public void textMessage(Message arg0) {

		String text = arg0.getText();

		if (text.equals("/start")) {
			if (userIsNew(arg0.getFrom().getId())) {
				sendMessage(new MessageToSend(arg0.getFrom().getId(), testoBenvenuto));
				statiUtenti.put(arg0.getFrom().getId(), new StatoUtente());
			}
			chooseLanguage(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		if (userIsNew(arg0.getFrom().getId()))
			statiUtenti.put(arg0.getFrom().getId(), new StatoUtente());

		if (text.equals(Italiano.ITALIANO)) {
			if (statiUtenti.get(arg0.getFrom().getId()).getSezione() == SezioniBot.SCEGLILINGUA)
				statiUtenti.get(arg0.getFrom().getId()).setLingua(Lingue.ITALIANO);
			inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		if (text.equals(English.ENGLISH)) {
			if (statiUtenti.get(arg0.getFrom().getId()).getSezione() == SezioniBot.SCEGLILINGUA)
				statiUtenti.get(arg0.getFrom().getId()).setLingua(Lingue.INGLESE);
			inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		if (text.equals(Italiano.IMPOSTALINGUA) || text.equals(English.SETLANGUAGE)) {
			chooseLanguage(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		if (text.equals(Italiano.CONTATTI) || text.equals(English.CONTACT))
		{
			sendMessage(new MessageToSend(arg0.getFrom().getId(), contact));
			return;
		}
		
		
		if(text.equals(Italiano.MERCATO) || text.equals(English.MARKET))
		{
			inviaMenuMercato(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}
		
		
		
		if(text.equals(Italiano.COMPITI) || text.equals(English.TASK))
		{
			inviaMenuCompiti(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}
		
		if(text.equals(back))
		{
			switch(statiUtenti.get(arg0.getFrom().getId()).getSezione())
			{
			case MARKET:
				inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
				break;
			case MARKETCONSULTA:
				inviaMenuMercato(arg0, statiUtenti.get(arg0.getFrom().getId()));
				break;
			case MARKETSTORICO:
				inviaMenuMercato(arg0, statiUtenti.get(arg0.getFrom().getId()));
				break;
			case MENU:
				
				break;
			case SCEGLILINGUA:
				
				break;
			case TASK:
				inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
				break;
				
			case TASKCONSULTA:
				
				break;
			default:
				break;
			
			}
			
			
			return;
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

	private void chooseLanguage(Message arg0, StatoUtente stato) {
		stato.setSezione(SezioniBot.SCEGLILINGUA);
		MessageToSend mts = new MessageToSend(arg0.getFrom().getId(), testoScegliLingua);
		mts.setReplyMarkup(languageKeyboard);
		sendMessage(mts);
	}

	private boolean userIsNew(long userid) {
		return !statiUtenti.containsKey(userid);
	}

	private void inviaMenu(Message arg0, StatoUtente stato) {
		stato.setSezione(SezioniBot.MENU);
		MessageToSend mts;
		if (stato.getLingua() == Lingue.ITALIANO) 
		{
			if(stato.isInOrto())
			{
			mts = new MessageToSend(arg0.getFrom().getId(), Italiano.MENUITALIANO);
			mts.setReplyMarkup(menuItalianoEntrata);
			}
			else
			{
				mts = new MessageToSend(arg0.getFrom().getId(), Italiano.MENUITALIANO);
				mts.setReplyMarkup(menuItalianoUscita);
			}
		} else 
		{
			if(stato.isInOrto())
			{
			mts = new MessageToSend(arg0.getFrom().getId(), English.ENGLISHMENU);
			mts.setReplyMarkup(englishMenuEntry);
			}
			else
			{
				mts = new MessageToSend(arg0.getFrom().getId(), English.ENGLISHMENU);
				mts.setReplyMarkup(englishMenuExit);
			}
		}

		sendMessage(mts);
	}
	
	private void inviaMenuMercato(Message arg0, StatoUtente stato) 
	{
		if(stato.getSezione() != SezioniBot.MENU)
		{
			inviaMenu(arg0, stato);
			return;
		}
		
		stato.setSezione(SezioniBot.MARKET);
		MessageToSend mts;
		if (stato.getLingua() == Lingue.ITALIANO) {
			mts = new MessageToSend(arg0.getFrom().getId(), Italiano.BENVENUTOMERCATO);
			mts.setReplyMarkup(menuMercato);
		} else {
			mts = new MessageToSend(arg0.getFrom().getId(), English.WELCOMEMARKET);
			mts.setReplyMarkup(marketMenu);
		}
		
		sendMessage(mts);
	}
	
	
	private void inviaMenuCompiti(Message arg0, StatoUtente stato) 
	{
		if(stato.getSezione() != SezioniBot.MENU)
		{
			inviaMenu(arg0, stato);
			return;
		}
		
		stato.setSezione(SezioniBot.TASK);
		MessageToSend mts;
		if (stato.getLingua() == Lingue.ITALIANO) {
			mts = new MessageToSend(arg0.getFrom().getId(), Italiano.BENVENUTOCOMPITI);
			mts.setReplyMarkup(menuCompiti);
		} else {
			mts = new MessageToSend(arg0.getFrom().getId(), English.WELCOMETASK);
			mts.setReplyMarkup(taskMenu);
		}
		
		sendMessage(mts);
	}
	
	private void checkInOrto(Message arg0, StatoUtente stato)
	{
		
	}

}
