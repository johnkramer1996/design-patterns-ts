class User {
  name: string
  email: string

  constructor(_name: string, _email: string) {
    this.email = _email
    this.name = _name
  }
}

class UserCollection {
  users: User[] = []

  getUsers(): User[] {
    return this.users
  }

  count(): number {
    return this.users.length
  }

  add(user: User): void {
    this.users.push(user)
  }

  remove(user: User): void {
    this.users = this.users.filter((_user) => user.email === _user.email)
  }

  getIterator(): UserIterator {
    return new UserIterator(this)
  }
}

interface Iterator<T> {
  getNext(): T
  hasMore(): boolean
}

class UserIterator implements Iterator<User> {
  private collection: UserCollection
  private position: number = -1

  constructor(collection: UserCollection) {
    this.collection = collection
  }

  getNext(): User {
    return this.collection.getUsers()[++this.position]
  }

  hasMore(): boolean {
    return this.collection.count() > this.position + 1
  }
}

class MailService {
  static sendMail(iterator: UserIterator, text: string): void {
    while (iterator.hasMore()) {
      let user = iterator.getNext()
      console.log(`Email sent to ${user.email} with text '${text}'`)
    }
  }
}

class IteratorExample {
  subscribedUsers: UserCollection

  constructor() {
    this.subscribedUsers = this.configure()
    this.run()
  }

  configure(): UserCollection {
    const collection = new UserCollection()

    collection.add(new User('John Doe', 'john@doe.com'))
    collection.add(new User('John Doe Jr.', 'john1@doe.com'))
    collection.add(new User('John Doe Sr.', 'john2@doe.com'))

    return collection
  }

  run(): void {
    MailService.sendMail(this.subscribedUsers.getIterator(), 'spam')
  }
}

new IteratorExample()
