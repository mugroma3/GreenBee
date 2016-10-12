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

import apinod.APINod;
import gestionelingue.English;
import gestionelingue.Italiano;
import gestionelingue.Lingue;

public class OrtoBioBot extends Bot {

	private APINod API;

	public static final String testoScegliLingua = "Scegli la tua lingua \nChoose your language";
	public static final String testoBenvenuto = "Benvenuto in GreenBeeBot \nWelcome in GreenBeeBot  \n\n"
			+ "Powered by MUG Roma tre: \nhttps://telegram.me/mugroma3 \nhttp://muglab.uniroma3.it/  "
			+ "\nhttps://www.facebook.com/mugroma3 " + "\nhttps://www.twitter.com/mugroma3  ";

	public static final String contact = "Powered by MUG Roma tre: \nhttps://telegram.me/mugroma3 \nhttp://muglab.uniroma3.it/  "
			+ "\nhttps://www.facebook.com/mugroma3 " + "\nhttps://www.twitter.com/mugroma3  ";

	public static final String BACK = "🔙";
	public static final String REFRESH = "🔄";
	public static final String LEFT = "⬅️";
	public static final String RIGHT = "➡️";
	
	
	
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
	private static ReplyKeyboardMarkupWithButtons browseMenu;
	
	
	public OrtoBioBot(String token) {
		super(token);
		API = APINod.getIstance();

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
		menuMercato.addLine(Italiano.CONSULTA, Italiano.AGGIUNGI, Italiano.STORICO, BACK);
		menuMercato.setResizeKeyboard(true);

		keyboard = new ArrayList<List<KeyboardButton>>();
		marketMenu = new ReplyKeyboardMarkupWithButtons(keyboard);
		marketMenu.addLine(English.BROWSE, English.ADD, English.HISTORY, BACK);
		marketMenu.setResizeKeyboard(true);

		keyboard = new ArrayList<List<KeyboardButton>>();
		menuCompiti = new ReplyKeyboardMarkupWithButtons(keyboard);
		menuCompiti.addLine(Italiano.CONSULTA, Italiano.AGGIUNGI, BACK);
		menuCompiti.setResizeKeyboard(true);

		keyboard = new ArrayList<List<KeyboardButton>>();
		taskMenu = new ReplyKeyboardMarkupWithButtons(keyboard);
		taskMenu.addLine(English.BROWSE, English.ADD, BACK);
		taskMenu.setResizeKeyboard(true);
		browseMenu = getBrowseMenu();
	}

	
	public static ReplyKeyboardMarkupWithButtons getBrowseMenu()
	{
		if(browseMenu == null)
		{
			browseMenu = new ReplyKeyboardMarkupWithButtons(new ArrayList<List<KeyboardButton>>());
			browseMenu.addLine(LEFT, RIGHT, REFRESH, BACK);
			browseMenu.setResizeKeyboard(true);
		}
		return browseMenu;
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

		StatoUtente stato = statiUtenti.get(arg0.getFrom().getId());

		if (text.equals(Italiano.ITALIANO)) {
			if (stato.getSezione() == SezioniBot.SCEGLILINGUA)
				stato.setLingua(Lingue.ITALIANO);
			inviaMenu(arg0, stato);
			return;
		}

		if (text.equals(English.ENGLISH)) {
			if (stato.getSezione() == SezioniBot.SCEGLILINGUA)
				stato.setLingua(Lingue.INGLESE);
			inviaMenu(arg0, stato);
			return;
		}

		if (text.equals(Italiano.IMPOSTALINGUA) || text.equals(English.SETLANGUAGE)) {
			chooseLanguage(arg0, stato);
			return;
		}

		if (text.equals(Italiano.CONTATTI) || text.equals(English.CONTACT)) {
			sendMessage(new MessageToSend(arg0.getFrom().getId(), contact));
			return;
		}

		if (text.equals(Italiano.MERCATO) || text.equals(English.MARKET)) {
			inviaMenuMercato(arg0, stato);
			return;
		}

		if (text.equals(Italiano.COMPITI) || text.equals(English.TASK)) {
			if (stato.getSezione() == SezioniBot.MENU)
			    inviaMenuCompiti(arg0, stato);
			else
				inviaMenu(arg0, stato);
			return;
		}

		if (text.equals(Italiano.CONSULTA) || text.equals(English.BROWSE)) {
			if (stato.getSezione() == SezioniBot.MARKET) {
				consultaMarket(arg0, stato);
				return;
			} else
				inviaMenu(arg0, stato);
		}

		
		if(text.equals(Italiano.NOCOMPRA) || text.equals(English.DONTBUY))
		{
			if(stato.getSezione() == SezioniBot.MARKETCONSULTA)
				consultaMarket(arg0, stato);
			else
				inviaMenu(arg0, stato);
			return;
		}
		
		if(text.equals(Italiano.COMPRA) || text.equals(English.BUY))
		{
			
		}
		
		if (text.equals(BACK)) {
			switch (stato.getSezione()) {
			case MARKET:
				inviaMenu(arg0, stato);
				break;
			case MARKETCONSULTA:
				inviaMenuMercato(arg0, stato);
				break;
			case MARKETSTORICO:
				inviaMenuMercato(arg0, stato);
				break;
			case MENU:

				break;
			case SCEGLILINGUA:

				break;
			case TASK:
				inviaMenu(arg0, stato);
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

	}

	@Override
	public void callback_query(CallbackQuery arg0) {

	}

	@Override
	public void chose_inline_result(ChosenInlineResult arg0) {

	}

	@Override
	public void contactMessage(Message arg0) {

	}

	@Override
	public void documentMessage(Message arg0) {

	}

	@Override
	public void groupChatCreatedMessage(Message arg0) {

	}

	@Override
	public void groupChatPhotoDeleteMessage(Message arg0) {

	}

	@Override
	public void inLineQuery(InlineQuery arg0) {

	}

	@Override
	public void leftChatMemberMessage(Message arg0) {

	}

	@Override
	public void locationMessage(Message arg0) {

		if (userIsNew(arg0.getFrom().getId())) {
			statiUtenti.put(arg0.getFrom().getId(), new StatoUtente());

		}
		if (statiUtenti.get(arg0.getFrom().getId()).getSezione() != SezioniBot.MENU || arg0.getReplyToMessage() == null
				|| !checkRisp(arg0.getReplyToMessage().getText())) {
			inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		checkInOrto(arg0, statiUtenti.get(arg0.getFrom().getId()));

		if (!statiUtenti.get(arg0.getFrom().getId()).isInOrto()) {

			if (addIngresso(arg0, statiUtenti.get(arg0.getFrom().getId()))) {
				statiUtenti.get(arg0.getFrom().getId()).setInOrto(true);
				if (statiUtenti.get(arg0.getFrom().getId()).getLingua() == Lingue.ITALIANO)
					sendMessage(new MessageToSend(arg0.getChat().getId(), Italiano.CONFENT));
				else
					sendMessage(new MessageToSend(arg0.getChat().getId(), English.CONFENT));
			} else if (statiUtenti.get(arg0.getFrom().getId()).getLingua() == Lingue.ITALIANO)
				sendMessage(new MessageToSend(arg0.getChat().getId(), Italiano.ERRENT));
			else
				sendMessage(new MessageToSend(arg0.getChat().getId(), English.ERRENT));
			inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
			return;
		}

		if (addUscita(arg0, statiUtenti.get(arg0.getFrom().getId()))) {
			statiUtenti.get(arg0.getFrom().getId()).setInOrto(false);
			if (statiUtenti.get(arg0.getFrom().getId()).getLingua() == Lingue.ITALIANO)
				sendMessage(new MessageToSend(arg0.getChat().getId(), Italiano.CONFUSC));
			else
				sendMessage(new MessageToSend(arg0.getChat().getId(), English.CONFEXT));
		} else if (statiUtenti.get(arg0.getFrom().getId()).getLingua() == Lingue.ITALIANO)
			sendMessage(new MessageToSend(arg0.getChat().getId(), Italiano.ERRUSC));
		else
			sendMessage(new MessageToSend(arg0.getChat().getId(), English.ERREXIT));
		inviaMenu(arg0, statiUtenti.get(arg0.getFrom().getId()));
	}

	@Override
	public void newChatMemberMessage(Message arg0) {

	}

	@Override
	public void newChatPhotoMessage(Message arg0) {

	}

	@Override
	public void newChatTitleMessage(Message arg0) {

	}

	@Override
	public void photoMessage(Message arg0) {

		System.out.println(arg0.getPhoto().get(0).getFileID());
	}

	@Override
	public void stickerMessage(Message arg0) {

	}

	@Override
	public void venueMessage(Message arg0) {

	}

	@Override
	public void videoMessage(Message arg0) {

	}

	@Override
	public void voiceMessage(Message arg0) {

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
		checkInOrto(arg0, stato);
		stato.setSezione(SezioniBot.MENU);
		MessageToSend mts;
		if (stato.getLingua() == Lingue.ITALIANO) {
			if (stato.isInOrto()) {
				mts = new MessageToSend(arg0.getFrom().getId(), Italiano.MENUITALIANO);
				mts.setReplyMarkup(menuItalianoUscita);
			} else {
				mts = new MessageToSend(arg0.getFrom().getId(), Italiano.MENUITALIANO);
				mts.setReplyMarkup(menuItalianoEntrata);
			}
		} else {
			if (stato.isInOrto()) {
				mts = new MessageToSend(arg0.getFrom().getId(), English.ENGLISHMENU);
				mts.setReplyMarkup(englishMenuExit);
			} else {
				mts = new MessageToSend(arg0.getFrom().getId(), English.ENGLISHMENU);
				mts.setReplyMarkup(englishMenuEntry);
			}
		}

		sendMessage(mts);
	}

	private void inviaMenuMercato(Message arg0, StatoUtente stato) {
		if (stato.getSezione() != SezioniBot.MENU) {
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

	private void inviaMenuCompiti(Message arg0, StatoUtente stato) {
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

	private void checkInOrto(Message arg0, StatoUtente stato) {
		stato.setInOrto(API.isNellOrto(arg0.getFrom().getId()));
	}

	private boolean addIngresso(Message arg0, StatoUtente stato) {
		return API.addIngresso(arg0.getFrom().getId());
	}

	private boolean addUscita(Message arg0, StatoUtente stato) {
		return API.addUscita(arg0.getFrom().getId());
	}

	private boolean checkRisp(String text) {
		return text.equals(Italiano.MENUITALIANO) || text.equals(English.ENGLISHMENU);
	}
	
	private void consultaMarket(Message arg0, StatoUtente stato)
	{
			stato.setMagazzino(API.getMagazzino());
			stato.setSezione(SezioniBot.MARKETCONSULTA);
			sendMessage(NumericKeyboardFactory.getIstance().getStandardBrowseMessage(arg0.getChat().getId(), stato));
			/*
			VoceMercato vm = new VoceMercato(stato.getMagazzino().get(0), arg0, this, stato);
			vm.sendVoce();
			*/
	}
}
