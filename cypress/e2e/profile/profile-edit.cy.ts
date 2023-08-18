let profileId = '';

describe('Пользователь заходит на страницу профиля', () => {
	beforeEach(() => {
		cy.login().then((data) => {
			profileId = data.id;
			cy.visit('profile/' + data.id);
		});
	});

	afterEach(() => {
		cy.resetProfile(profileId);
	});

	it('И профиль успешно загружается', () => {
		cy.getByTestId('ProfileCard.firstname').should('have.value', 'test');
	});

	it('И редактирует его', () => {
		const newFirstname = 'firstname';
		const newLastname = 'lastname';
		cy.updateProfile(newFirstname, newLastname);
		cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
		cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
	});
});
